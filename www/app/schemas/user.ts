import { z } from 'zod'

import { avatarUrlByEmail } from '@/lib/avatar_url'
import { buildPageSchema, createParser, NullableInputStringSchema } from './_shared'

export type UserType = {
  id: number
  email: string
  name: string
  avatarUrl(): string
}

export const UserSchema = z.object({
  id: z.number().int(),
  email: z.string().optional(),
  name: z.string().optional(),
})

export function parseUser(value: z.output<typeof UserSchema>): UserType {
  return {
  id: value.id,
  email: value.email ?? '',
  name: value.name ?? '',
  avatarUrl() {
    return avatarUrlByEmail(value.email)
  },
  }
}

export type UserBoxType = { user: UserType }
const UserBoxRawSchema = z.object({
  user: UserSchema,
})

export const UserBoxSchema = createParser(UserBoxRawSchema, ({ user }) => ({ user: parseUser(user) }))

export type UserPageType = {
  list: UserBoxType[]
  total_count: number
  offset: number
  limit: number
}

const UserPageRawSchema = buildPageSchema(UserBoxRawSchema)
export const UserPageSchema = createParser(UserPageRawSchema, (value) => ({
  ...value,
  list: value.list.map(({ user }) => ({ user: parseUser(user) })),
}))

export const UserBodySchema = z.object({
  email: NullableInputStringSchema,
  name: NullableInputStringSchema,
})
export type UserBodyType = z.output<typeof UserBodySchema>
