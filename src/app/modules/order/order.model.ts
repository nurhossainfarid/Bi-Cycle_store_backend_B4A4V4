import { Schema, model } from 'mongoose'
import { TOrder } from './order.interface'

const orderSchema = new Schema<TOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, '{ru}'],
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
    status: {
      type: String,
      enum: ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
      default: 'PENDING',
    },
    discount: {
      type: Number,
      min: [0, 'Discount cannot be negative.'],
    },
  },
  {
    timestamps: true,
  },
)

// Create the Order model
export const Order = model<TOrder>('Order', orderSchema)
