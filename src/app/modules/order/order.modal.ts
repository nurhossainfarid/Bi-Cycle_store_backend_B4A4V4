import { Schema, model } from 'mongoose'
import { TOrder } from './order.interface'

const orderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Provide valid email',
      ], 
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, '{rp}'],
    },
    quantity: {
      type: Number,
      required: [true, 'Order quantity is required.'],
      min: [1, 'Quantity must be at least 1.'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required.'],
      min: [0, 'Total price cannot be negative.'],
    },
  },
  {
    timestamps: true,
  },
)

// Create the Order model
export const OrderModel = model<TOrder>('Order', orderSchema)
