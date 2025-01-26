import { model, Schema } from 'mongoose'
import { TProduct } from './product.interface'

// product schema
const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required.'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'Product brand is required.'],
      trim: true,
    },
    model: {
      type: String,
      required: [true, 'Product model is required.'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required.'],
      min: [0, 'Price must be a positive number.'],
    },
    type: {
      type: String,
      enum: {
        values: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
        message:
          'Type must be one of Mountain, Road, Hybrid, BMX, or Electric.',
      },
      required: [true, 'Product type is required.'],
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Product quantity is required.'],
      min: [0, 'Quantity must be a non-negative number.'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'Stock status is required.'],
      default: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
)

// Creating the Mongoose model
export const Product = model('Product', productSchema)
