import { TProduct, TUpdateProductData } from "./product.interface";
import { ProductModel } from "./product.model";


// Create a product
const createProductIntoDB = async (product: TProduct) => {
    const result = await ProductModel.create(product);
    if (!result) {
        throw new Error('Product can not be created')
    }
    return result;
}

// Get All products
const getAllProductsFromDB = async (searchTerm: object) => {
    const result = await ProductModel.find(searchTerm);
    if (!result) {
        throw new Error('Products not found')
    }
    return result;
}

// Get a specific product by id
const getSpecificProductFromDB = async (productId: string) => {
    const result = await ProductModel.findById({ _id: productId});
    if (!result) {
        throw new Error('Product not found')
    }
    return result;
}

// Update a product by id
const updateProductIntoDB = async (productId: string, updateData: TUpdateProductData) => {
    const result = await ProductModel.findByIdAndUpdate({ _id: productId}, {$set: updateData}, {new: true });
    if (!result) {
        throw new Error('Product can not be updated')
    }
    return result;
}

// Delete a product by 
const deleteProductFromDB = async (productId: string) => {
    const result = await ProductModel.deleteOne({ _id: productId});
    if (!result) {
        throw new Error('Product can not be deleted')
    }
    return result;
}


export const ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSpecificProductFromDB,
    updateProductIntoDB,
    deleteProductFromDB
}