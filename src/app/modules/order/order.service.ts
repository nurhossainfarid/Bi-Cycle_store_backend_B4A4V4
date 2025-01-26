import { ProductModel } from '../product/product.model'
import { TOrder } from './order.interface'
import { OrderModel } from './order.modal'

// create new order
const createOrderIntoDB = async (orderData: TOrder) => {
  const { email, product, quantity, totalPrice } = orderData
  const findProduct = await ProductModel.findById(product)

  //   Check Validate input
  if (!email || !product || !quantity || quantity <= 0) {
    throw new Error(
      'Invalid input. Email, productId, and a positive quantity are required.',
    )
  }
  if (!findProduct) {
    throw new Error('Product not found')
  }
  if (findProduct.quantity < quantity) {
    throw new Error(
      `Insufficient stock. Only ${findProduct.quantity} items left.`,
    )
  }

  const newOrder = await OrderModel.create({
    email,
    product,
    quantity,
    totalPrice,
  })

  //   update product
  findProduct.quantity -= quantity
  if (findProduct.quantity === 0) {
    findProduct.inStock = false
  }
  await findProduct.save()
  return newOrder
}

// calculate total revenue
const calculateTotalRevenueFromDB = async () => {
  const revenue = await OrderModel.aggregate([
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
}
