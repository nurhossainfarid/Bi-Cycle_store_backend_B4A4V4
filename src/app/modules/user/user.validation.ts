import { z } from 'zod'

export const createUserValidationSchema = z.object({
  body: z.object({
    author: z.object({
      email: z.string().email(),
      password: z.string().min(8),
      name: z.string().min(2),
    }),
  }),
})
