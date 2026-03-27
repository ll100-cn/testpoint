import { z } from 'zod'

import { avatarUrlByEmail } from '@/lib/avatar_url'
import { createParser, NullableInputStringSchema } from './_shared'
import { parseUser, UserSchema, type UserType } from './user'

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
})

export function parseAccount(value: z.output<typeof AccountSchema>): AccountType {
  return {
  user: parseUser(value.user),
  name: value.name,
  email: value.email,
  admin: value.admin,
  avatarUrl() {
    return avatarUrlByEmail(value.email)
  },
  }
}

export type AccountBoxType = { account: AccountType }
const AccountBoxRawSchema = z.object({
  account: AccountSchema,
})

export const AccountBoxSchema = createParser(AccountBoxRawSchema, ({ account }) => ({ account: parseAccount(account) }))

export const AccountBodySchema = z.object({
  name: NullableInputStringSchema,
  email: NullableInputStringSchema,
})
export type AccountBodyType = z.output<typeof AccountBodySchema>
