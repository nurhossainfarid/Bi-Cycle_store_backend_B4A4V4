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
  transaction: {
    id: string
    transactionStatus: string
    bank_status: string
    sp_code: string
    sp_message: string
    method: string
    date_time: string
  }
  discount?: number
}
