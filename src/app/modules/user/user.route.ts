import express from 'express'
import { UserController } from './user.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from './user.constant'

const router = express.Router()

router.get('/',auth(USER_ROLE.admin), UserController.getAllUsers)

router.get('/:id', UserController.getSingleUser)

router.delete('/:id', UserController.deleteUser)

export const UserRoutes = router
