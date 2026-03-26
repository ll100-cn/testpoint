import { z } from 'zod'

import { avatarUrlByEmail } from '@/lib/avatar_url'
import { NullableInputStringSchema } from './_shared'
import { UserSchema, type UserType } from './user'

export type AccountType = {
  user: UserType
  name: string
  email: string
  admin: boolean
  avatarUrl(): string
}

export const AccountSchema = z.object({
  user: UserSchema,
  name: z.string(),
  email: z.string(),
  admin: z.boolean(),
}).transform((value) => ({
  user: value.user,
  name: value.name,
  email: value.email,
  admin: value.admin,
  avatarUrl() {
    return avatarUrlByEmail(value.email)
  },
}) as AccountType)

export type AccountBoxType = { account: AccountType }
export const AccountBoxSchema = z.object({
  account: AccountSchema,
})

export const AccountBodySchema = z.object({
  name: NullableInputStringSchema,
  email: NullableInputStringSchema,
})
export type AccountBodyType = z.output<typeof AccountBodySchema>
