import express from 'express'
import { ProductController } from './product.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()

router.post(
  '/create-bicycle',
  auth(USER_ROLE.admin),
  ProductController.createProduct,
)
router.get(
  '/:productId',
  auth(USER_ROLE.customer, USER_ROLE.admin),
  ProductController.getSpecificProduct,
)
router.get(
  '/',
  auth(USER_ROLE.customer, USER_ROLE.admin),
  ProductController.getAllProducts,
)
router.put(
  '/:productId',
  auth(USER_ROLE.admin),
  ProductController.updateProduct,
)
router.delete(
  '/:productId',
  auth(USER_ROLE.admin),
  ProductController.deleteProduct,
)

export const ProductRoutes = router
