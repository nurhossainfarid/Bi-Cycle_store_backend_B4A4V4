import { Request, Response } from 'express'
import { ProductServices } from './product.service'

// create product
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body
    const data = await ProductServices.createProductIntoDB(productData)

    res.status(200).json({
      message: 'Bicycle created successfully',
      success: true,
      data: data,
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

// get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query
    const data = await ProductServices.getAllProductsFromDB(searchTerm)

    res.status(200).json({
      message: 'Bicycles retrieved successfully',
      status: true,
      data: data,
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

// get a specific product by id
const getSpecificProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const data = await ProductServices.getSpecificProductFromDB(productId)

    res.status(200).json({
      message: 'Bicycle retrieved successfully',
      status: true,
      data: data,
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

// update a specific product by id
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;
    const result = await ProductServices.updateProductIntoDB(productId, updateData);

    res.status(200).json({
      message: 'Bicycle updated successfully',
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

// delete product by id
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const data = await ProductServices.deleteProductFromDB(productId)

    res.status(200).json({
      message: 'Bicycle deleted successfully',
      status: true,
      data: data,
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

export const ProductController = {
  createProduct,
  getAllProducts,
  getSpecificProduct,
  updateProduct,
  deleteProduct
}
