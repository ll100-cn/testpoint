import { z } from 'zod'

import { buildListParser, DateTimeSchema, NullableBooleanInputSchema, NullableInputStringSchema, NullableStringSchema } from './_shared'
import { ProjectSchema, type ProjectType } from './project'
import { UserSchema, type UserType } from './user'

export type MemberRole = 'reporter' | 'developer' | 'manager' | 'owner'
export type MemberType = {
  id: number
  name: string
  nickname?: string | null
  role: MemberRole
  role_text: string
  receive_mail: boolean
  user_id: number
  project_id: number
  avatar_url?: string | null
  archived_at?: Date | null
}
export type MemberBoxType = { member: MemberType, project?: ProjectType, user?: UserType }
export type MemberInfoBoxType = { member: MemberType, project: ProjectType, user: UserType }
export type MemberListType = MemberBoxType[]
export type MemberInfoListType = MemberInfoBoxType[]

export const MemberSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  nickname: NullableStringSchema,
  role: z.enum(['reporter', 'developer', 'manager', 'owner']),
  role_text: z.string(),
  receive_mail: z.boolean(),
  user_id: z.number().int(),
  project_id: z.number().int(),
  archived_at: DateTimeSchema.nullable().optional(),
  avatar_url: NullableStringSchema,
}) as z.ZodType<MemberType>

export const MemberBoxSchema = z.object({
  member: MemberSchema,
  project: ProjectSchema.optional(),
  user: UserSchema.optional(),
}) as z.ZodType<MemberBoxType>

export const MemberInfoBoxSchema = z.object({
  member: MemberSchema,
  project: ProjectSchema,
  user: UserSchema,
}) as z.ZodType<MemberInfoBoxType>

export const MemberListSchema = buildListParser(MemberBoxSchema) as { parse(input: unknown): MemberListType }

export const MemberInfoListSchema = buildListParser(MemberInfoBoxSchema) as { parse(input: unknown): MemberInfoListType }

export const MemberBodySchema = z.object({
  user_email: NullableInputStringSchema.optional(),
  nickname: NullableInputStringSchema.optional(),
  role: NullableInputStringSchema.optional(),
  receive_mail: NullableBooleanInputSchema.optional(),
}).passthrough()
export type MemberBodyType = z.output<typeof MemberBodySchema>
