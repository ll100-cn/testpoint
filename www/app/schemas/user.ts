import { z } from 'zod'

import { avatarUrlByEmail } from '@/lib/avatar_url'
import { buildPageSchema, NullableInputStringSchema } from './_shared'

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
}).transform((value) => ({
  id: value.id,
  email: value.email ?? '',
  name: value.name ?? '',
  avatarUrl() {
    return avatarUrlByEmail(value.email)
  },
}) as UserType)

export type UserBoxType = { user: UserType }
export const UserBoxSchema = z.object({
  user: UserSchema,
})

export type UserPageType = {
  list: UserBoxType[]
  totalCount: number
  offset: number
  limit: number
  current_page: number
  total_pages: number
}
export const UserPageSchema = buildPageSchema(UserBoxSchema) as z.ZodType<UserPageType>

export const UserBodySchema = z.object({
  email: NullableInputStringSchema,
  name: NullableInputStringSchema,
})
export type UserBodyType = z.output<typeof UserBodySchema>
