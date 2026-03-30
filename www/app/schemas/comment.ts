import { z } from 'zod'

import {
  AttachmentSchema,
  parseAttachment,
  type AttachmentType,
} from './issue'
import { MemberSchema } from './member'
import { NullableInputStringSchema, NullableIntegerInputSchema } from './_shared'
import { DateTimeSchema } from './_shared'
import { createParser } from './_shared'

const CommentRawSchema = z.object({
  id: z.number().int(),
  content: z.string(),
  created_at: DateTimeSchema,
  updated_at: DateTimeSchema,
  issue_id: z.number().int(),
  last_edited_at: DateTimeSchema.nullable().optional(),
  member_id: z.number().int(),
  comment_id: z.number().int().nullable().optional(),
  collapsed: z.boolean(),
  display: z.preprocess((value) => String(value ?? ''), z.string()),
  member: MemberSchema.optional(),
  attachments: z.array(AttachmentSchema).optional().default([]),
})
export type CommentType = Omit<z.output<typeof CommentRawSchema>, 'attachments'> & {
  attachments: AttachmentType[]
}

export function parseComment(value: z.output<typeof CommentRawSchema>): CommentType {
  return {
    ...value,
    attachments: value.attachments.map(parseAttachment),
  }
}

export const CommentSchema = createParser(CommentRawSchema, parseComment)

const CommentBoxRawSchema = z.object({
  comment: CommentRawSchema,
})
export type CommentBoxType = {
  comment: CommentType
}

export const CommentBoxSchema = createParser(CommentBoxRawSchema, ({ comment }) => ({
  comment: parseComment(comment),
}))

const CommentListRawSchema = z.object({
  list: z.array(CommentBoxRawSchema),
})
export type CommentListType = {
  list: CommentBoxType[]
}

export const CommentListSchema = createParser(CommentListRawSchema, ({ list }) => ({
  list: list.map(({ comment }) => ({
    comment: parseComment(comment),
  })),
}))

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
