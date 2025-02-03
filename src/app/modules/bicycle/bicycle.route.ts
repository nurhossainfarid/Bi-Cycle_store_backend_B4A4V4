import express from 'express'
import { BicycleController } from './bicycle.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'
import validateRequest from '../../middlewares/validateRequest'
import { BicycleValidation } from './bicycle.validation'

const router = express.Router()

router.post(
  '/create-bicycle',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  validateRequest(BicycleValidation.createBicycleValidationSchema),
  BicycleController.createBicycle,
)
router.get(
  '/:bicycleId',
  auth(USER_ROLE.customer, USER_ROLE.admin),
  BicycleController.getSpecificBicycle,
)
router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  BicycleController.getAllBicycles,
)
router.put(
  '/:bicycleId',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  validateRequest(BicycleValidation.updateBicycleValidationSchema),
  BicycleController.updateBicycle,
)
router.delete(
  '/:bicycleId',
  auth(USER_ROLE.admin),
  BicycleController.deleteBicycle,
)

export const BicycleRoutes = router
