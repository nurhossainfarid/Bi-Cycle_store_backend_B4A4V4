import { Router } from 'express'
import { UserRoutes } from '../modules/user/user.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
]

moduleRoutes.forEach((r) => router.use(r.path, r.route))

export default router
