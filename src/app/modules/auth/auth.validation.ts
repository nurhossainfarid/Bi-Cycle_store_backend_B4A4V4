import { z } from 'zod'

const registrationValidationSchema = z.object({
  body: z.object({
    name: z.string({required_error: 'Name is required.'}),
    email: z.string({ required_error: 'Email is required.' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
})

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required.' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
})

// TODO: Change password validation schema

export const AuthValidation = {
  registrationValidationSchema,
  loginValidationSchema,
}
