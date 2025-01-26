import config from '../../config'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AuthServices } from './auth.service'
import httpStatus from 'http-status'

const registrationUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registrationUser(req.body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result,
  })
})

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body)
  const { refreshToken, token } = result

  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  })

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Login successful!',
    success: true,
    data: { token },
  })
})

// TODO: Change password controller

export const AuthController = {
  registrationUser,
  loginUser,
}
