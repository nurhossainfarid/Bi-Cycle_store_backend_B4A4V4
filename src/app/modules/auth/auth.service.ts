import AppError from '../../errors/AppError'
import { TLoginUser, TRegisterUser } from './auth.interface'
import httpStatus from 'http-status'
import { createToken } from './auth.utils'
import config from '../../config'
import { User } from '../user/user.model'

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByEmail(payload.email)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid credentials')
  }

  // check the user already deleted
  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted!')
  }

  // check the user already blocked
  const userStatus = user?.isBlocked
  if (userStatus) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!')
  }

  // checking if the password is correct
  const isPasswordMatch = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  )

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials')
  }

  // create token and sent to the client
  const jwtPayload = {
    email: user.email,
    role: user.role,
  }

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  )

  return {
    token,
    refreshToken,
  }
}

const registrationUser = async (payload: TRegisterUser) => {
  const user = await User.isUserExistsByEmail(payload.email)

  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This user is already exists!')
  }

  const {email, name } = await User.create(payload)

  return {
    email,
    name,
  }
}

// TODO: Change password

export const AuthServices = {
  loginUser,
  registrationUser,
}
