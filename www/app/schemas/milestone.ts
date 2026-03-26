import { z } from 'zod'

import { DateTimeSchema, NullableInputStringSchema, NullableStringSchema } from './_shared'

export type MilestoneType = {
  id: number
  projectId: number
  title: string
  description?: string
  platformIds: number[]
  publishedAt?: Date
  archivedAt?: Date
  isPublished(): boolean
  isArchived(): boolean
}
export type MilestoneBoxType = { milestone: MilestoneType }
export type MilestoneListType = MilestoneBoxType[]

function withMilestoneMethods<T extends { publishedAt: Date | null; archivedAt: Date | null }>(milestone: T) {
  return {
    ...milestone,
    isPublished() {
      if (milestone.publishedAt == null) {
        return false
      }

      return milestone.publishedAt <= new Date()
    },
    isArchived() {
      return milestone.archivedAt !== null
    },
  }
}

export const MilestoneSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  description: NullableStringSchema,
  published_at: DateTimeSchema.nullable().optional().transform((value) => value ?? null),
  archived_at: DateTimeSchema.nullable().optional().transform((value) => value ?? null),
  project_id: z.number().int(),
}).transform((value) => withMilestoneMethods({
  id: value.id,
  title: value.title,
  description: value.description ?? undefined,
  platformIds: [],
  publishedAt: value.published_at ?? undefined,
  archivedAt: value.archived_at ?? undefined,
  projectId: value.project_id,
}) as MilestoneType)

export const MilestoneBoxSchema = z.object({
  milestone: MilestoneSchema,
}) as z.ZodType<MilestoneBoxType>

export const MilestoneListSchema = z.object({
  list: z.array(MilestoneBoxSchema),
}).transform(({ list }) => list) as z.ZodType<MilestoneListType>

export const MilestoneBodySchema = z.object({
  title: NullableInputStringSchema.optional(),
  description: NullableInputStringSchema.optional(),
  published_at: z.preprocess((value) => {
    if (value == null || value === '') {
      return null
    }

    if (value instanceof Date) {
      return value.toISOString()
    }

    return value
  }, z.string().nullable()).optional(),
}).passthrough()
export type MilestoneBodyType = z.output<typeof MilestoneBodySchema>
