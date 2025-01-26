import { Request, Response } from 'express'
import { OrderServices } from './order.service'

// create order
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body
    const result = await OrderServices.createOrderIntoDB(orderData)

    res.status(200).json({
      message: 'Order created successfully',
      status: true,
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error) {
      res.status(500).json({
        message: error.message,
        success: false,
        error: error,
        stack: error.stack,
      })
    }
  }
}

// get all orders
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.getAllOrdersFromDB(req.query)

    res.status(200).json({
      message: 'Orders fetched successfully',
      status: true,
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error) {
      res.status(500).json({
        message: error.message,
        success: false,
        error: error,
        stack: error.stack,
      })
    }
  }
}

// get single order
const getSingleOrder = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.getSingleOrderFromDB(req.params.id)

    res.status(200).json({
      message: 'Order fetched successfully',
      status: true,
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error) {
      res.status(500).json({
        message: error.message || 'Something went wrong',
        success: false,
        error: error,
        stack: error.stack,
      })
    }
  }
}

// calculate total revenue
const calculateTotalRevenue = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.calculateTotalRevenueFromDB()

    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error) {
      res.status(500).json({
        message: error.message || 'Something went wrong',
        success: false,
        error: error,
        stack: error.stack,
      })
    }
  }
}

export const OrderController = {
  createOrder,
  calculateTotalRevenue,
  getAllOrders, 
  getSingleOrder,
}
