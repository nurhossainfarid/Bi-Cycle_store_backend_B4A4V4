import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AuthValidation } from './auth.validation'
import { AuthController } from './auth.controller'

const router = express.Router()

router.post(
  '/register',
  validateRequest(AuthValidation.registrationValidationSchema),
  AuthController.registrationUser,
)

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
)

// TODO: Change password route

export const AuthRoutes = router
