/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../errors/AppError'
import { Product } from '../product/product.model'
import { User } from '../user/user.model'
import { TOrder } from './order.interface'
import httpStatus from 'http-status'
import { Order } from './order.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { orderSearchTerm } from './order.constant'
import mongoose from 'mongoose'

// create new order
const createOrderIntoDB = async (payload: TOrder) => {
  const { user, product, quantity } = payload

  const findProduct = await Product.findById(product)
  const userData = await User.findById(user)

  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found')
  }

  // check the user already deleted
  const isDeleted = userData?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted!')
  }

  // check the user already blocked
  const userStatus = userData?.isBlocked
  if (userStatus) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!')
  }

  if (!findProduct) {
    throw new Error('Product not found')
  }

  if (findProduct.quantity < quantity) {
    throw new Error(
      `Insufficient stock. Only ${findProduct.quantity} items left.`,
    )
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const newOrder = await Order.create([payload], { session })

    //   update product
    findProduct.quantity -= quantity
    if (findProduct.quantity === 0) {
      findProduct.inStock = false
    }
    await findProduct.save({ session })

    await User.updateOne(
      { _id: payload.user },
      { $push: { Orders: newOrder[0]._id } },
      { session },
    )

    await session.commitTransaction()
    session.endSession()
    
    return newOrder
  } catch (error: any) {
    await session.abortTransaction()
    session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, error.message)
  }
}

// get all orders
const getAllOrdersFromDB = async (query: Record<string, unknown>) => {
  // const orders = await OrderModel.find().populate('user').populate('product')

  const orderQuery = new QueryBuilder(Order.find(), query)
    .search(orderSearchTerm)
    .filter()
    .sort()
    .pagination()
    .fields()

  const result = await orderQuery.modelQuery

  return result
}

// get single order
const getSingleOrderFromDB = async (id: string) => {
  const result = await Order.findById(id).populate('user').populate('product')
  return result
}

// calculate total revenue
const calculateTotalRevenueFromDB = async () => {
  const revenue = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
      },
    },
  ])
  return revenue
}

export const OrderServices = {
  createOrderIntoDB,
  calculateTotalRevenueFromDB,
  getAllOrdersFromDB,
  getSingleOrderFromDB,
}
