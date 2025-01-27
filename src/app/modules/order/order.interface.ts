import { Types } from 'mongoose'

// Order type
export type TOrder = {
  user: Types.ObjectId
  products: {
    product: Types.ObjectId
    quantity: number
  }[]
  totalPrice: number
  status: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled'
  discount?: number
}
