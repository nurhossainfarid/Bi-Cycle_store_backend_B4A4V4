import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { UserServices } from './user.service'
import httpStatus from 'http-status'

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users are retrieved successfully',
    data: result,
  })
})

const getSingleUser = catchAsync(async (req, res) => {
  const result = await (
    await UserServices.getSingleUserFromDB(req.params.id)
  ).populate('Orders')

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved successfully',
    data: result,
  })
})

const getSingleUserByEmail = catchAsync(async (req, res) => {
  const result = await UserServices.getSingleUserByEmailFromDB(req.params.email)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved successfully',
    data: result,
  })
})

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await UserServices.deleteUserFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is deleted successfully',
    data: result,
  })
})

// TODO: update user controller

export const UserController = {
  getAllUsers,
  getSingleUser,
  getSingleUserByEmail,
  deleteUser,
}
