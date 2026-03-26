import { z } from 'zod'

import {
  AttachmentSchema,
} from './issue'
import { MemberSchema } from './member'
import { NullableInputStringSchema, NullableIntegerInputSchema } from './_shared'
import { DateTimeSchema } from './_shared'

export const CommentSchema = z.object({
  id: z.number().int(),
  content: z.string(),
  created_at: DateTimeSchema,
  updated_at: DateTimeSchema,
  issue_id: z.number().int(),
  last_edited_at: DateTimeSchema.nullable().optional(),
  member_id: z.number().int(),
  comment_id: z.number().int().nullable().optional(),
  collapsed: z.boolean(),
  display: z.union([z.boolean(), z.string(), z.null()]).optional(),
  member: MemberSchema.optional(),
  attachments: z.array(AttachmentSchema).optional().default([]),
}).transform((value) => ({
  id: value.id,
  content: value.content,
  createdAt: value.created_at,
  updatedAt: value.updated_at,
  issueId: value.issue_id,
  lastEditedAt: value.last_edited_at ?? null,
  memberId: value.member_id,
  commentId: value.comment_id ?? null,
  collapsed: value.collapsed,
  display: String(value.display ?? ''),
  member: value.member,
  attachments: value.attachments,
}))
export type CommentType = z.output<typeof CommentSchema>

export const CommentBoxSchema = z.object({
  comment: CommentSchema,
})
export type CommentBoxType = z.output<typeof CommentBoxSchema>

export const CommentListSchema = z.object({
  list: z.array(CommentBoxSchema),
})
export type CommentListType = z.output<typeof CommentListSchema>

export const CommentBodySchema = z.object({
  content: NullableInputStringSchema.optional(),
  comment_id: NullableIntegerInputSchema.optional(),
  display: z.union([z.boolean(), z.string(), z.null()]).optional(),
  attachments_params: z.array(z.unknown()).optional(),
  attachment_ids: z.array(z.unknown()).optional(),
}).passthrough()
export type CommentBodyType = z.output<typeof CommentBodySchema>

export const CommentConvertBodySchema = z.object({
  comment_id: NullableIntegerInputSchema.optional(),
}).passthrough()
export type CommentConvertBodyType = z.output<typeof CommentConvertBodySchema>
