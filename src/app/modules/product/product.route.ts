import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

router.post('/', ProductController.createProduct);
router.get('/:productId', ProductController.getSpecificProduct)
router.put('/:productId', ProductController.updateProduct)
router.delete('/:productId', ProductController.deleteProduct)
router.get('/', ProductController.getAllProducts);

export const ProductRoutes = router;