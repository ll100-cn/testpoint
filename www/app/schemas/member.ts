import { z } from 'zod'

import { DateTimeSchema, NullableBooleanInputSchema, NullableInputStringSchema, NullableStringSchema } from './_shared'
import { ProjectSchema, type ProjectType } from './project'
import { UserSchema, type UserType } from './user'

export type MemberRole = 'reporter' | 'developer' | 'manager' | 'owner'
export type MemberType = {
  id: number
  name: string
  nickname?: string
  role: MemberRole
  roleText: string
  receiveMail: boolean
  userId: number
  projectId: number
  avatarUrl?: string
  archivedAt?: Date
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
  archived_at: DateTimeSchema.nullable().optional().transform((value) => value ?? null),
  avatar_url: NullableStringSchema,
}).transform((value) => ({
  id: value.id,
  name: value.name,
  nickname: value.nickname ?? undefined,
  role: value.role,
  roleText: value.role_text,
  receiveMail: value.receive_mail,
  userId: value.user_id,
  projectId: value.project_id,
  archivedAt: value.archived_at ?? undefined,
  avatarUrl: value.avatar_url ?? undefined,
}) as MemberType)

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

export const MemberListSchema = z.object({
  list: z.array(MemberBoxSchema),
}).transform(({ list }) => list) as z.ZodType<MemberListType>

export const MemberInfoListSchema = z.object({
  list: z.array(MemberInfoBoxSchema),
}).transform(({ list }) => list) as z.ZodType<MemberInfoListType>

export const MemberBodySchema = z.object({
  user_email: NullableInputStringSchema.optional(),
  nickname: NullableInputStringSchema.optional(),
  role: NullableInputStringSchema.optional(),
  receive_mail: NullableBooleanInputSchema.optional(),
}).passthrough()
export type MemberBodyType = z.output<typeof MemberBodySchema>
