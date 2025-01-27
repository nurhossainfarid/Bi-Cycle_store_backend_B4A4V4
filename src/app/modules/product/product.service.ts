import AppError from '../../errors/AppError'
import { TProduct, TUpdateProductData } from './product.interface'
import { Product } from './product.model'
import httpStatus from 'http-status'

// Create a product
const createProductIntoDB = async (product: TProduct) => {
  const isProductExist = await Product.findOne({ name: product?.name })

  if (
    isProductExist?.name === product?.name &&
    isProductExist?.brand === product?.brand &&
    isProductExist?.model === product?.model
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Product already exists, please update product quantity.',
    )
  } else {
    const result = await Product.create(product)
    if (!result) {
      throw new Error('Product can not be created')
    }
    return result
  }
}

// Get All products
const getAllProductsFromDB = async (searchTerm: object) => {
  const result = await Product.find(searchTerm)
  if (!result) {
    throw new Error('Products not found')
  }
  return result
}

// Get a specific product by id
const getSpecificProductFromDB = async (productId: string) => {
  const result = await Product.findById({ _id: productId })
  if (!result) {
    throw new Error('Product not found')
  }
  return result
}

// Update a product by id
const updateProductIntoDB = async (
  productId: string,
  updateData: TUpdateProductData,
) => {
  if ((updateData?.quantity as number) > 0) {
    updateData.inStock = true
  }
  const result = await Product.findByIdAndUpdate(
    { _id: productId },
    { $set: updateData },
    { new: true },
  )
  if (!result) {
    throw new Error('Product can not be updated')
  }
  return result
}

// Delete a product by
const deleteProductFromDB = async (productId: string) => {
  const result = await Product.deleteOne({ _id: productId })
  if (!result) {
    throw new Error('Product can not be deleted')
  }
  return result
}

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSpecificProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
}
