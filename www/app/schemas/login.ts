import { z } from 'zod'

import { NullableInputStringSchema } from './_shared'

export const LoginCodeSchema = z.object({
  id: z.number().int(),
})
export type LoginCodeType = z.output<typeof LoginCodeSchema>

export const DeliverLoginBodySchema = z.object({
  email: NullableInputStringSchema,
})
export type DeliverLoginBodyType = z.output<typeof DeliverLoginBodySchema>

export const VerifyLoginBodySchema = z.object({
  user: z.object({
    email: NullableInputStringSchema,
    login_code: NullableInputStringSchema,
  }),
})
export type VerifyLoginBodyType = z.output<typeof VerifyLoginBodySchema>

export const VerifyLoginResponseSchema = z.object({}).passthrough()
export type VerifyLoginResponseType = z.output<typeof VerifyLoginResponseSchema>

export const LogoutResponseSchema = z.object({
  success: z.boolean(),
})
export type LogoutResponseType = z.output<typeof LogoutResponseSchema>
