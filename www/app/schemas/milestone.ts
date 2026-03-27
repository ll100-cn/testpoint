import { z } from 'zod'

import { createParser, DateTimeSchema, NullableInputStringSchema, NullableStringSchema } from './_shared'

export type MilestoneType = {
  id: number
  project_id: number
  title: string
  description?: string
  platform_ids: number[]
  published_at?: Date | null
  archived_at?: Date | null
  isPublished(): boolean
  isArchived(): boolean
}
export type MilestoneBoxType = { milestone: MilestoneType }
export type MilestoneListType = MilestoneBoxType[]

function withMilestoneMethods<T extends { published_at?: Date | null; archived_at?: Date | null }>(milestone: T) {
  return {
    ...milestone,
    isPublished() {
      if (milestone.published_at == null) {
        return false
      }

      return milestone.published_at <= new Date()
    },
    isArchived() {
      return milestone.archived_at !== null
    },
  }
}

export const MilestoneSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  description: NullableStringSchema,
  published_at: DateTimeSchema.nullable().optional(),
  archived_at: DateTimeSchema.nullable().optional(),
  project_id: z.number().int(),
})

export function parseMilestone(value: z.output<typeof MilestoneSchema>): MilestoneType {
  return withMilestoneMethods({
    id: value.id,
    title: value.title,
    description: value.description ?? undefined,
    platform_ids: [],
    published_at: value.published_at ?? null,
    archived_at: value.archived_at ?? null,
    project_id: value.project_id,
  }) as MilestoneType
}

const MilestoneBoxRawSchema = z.object({
  milestone: MilestoneSchema,
})

export const MilestoneBoxSchema = createParser(MilestoneBoxRawSchema, ({ milestone }) => ({ milestone: parseMilestone(milestone) })) as { parse(input: unknown): MilestoneBoxType }

export const MilestoneListSchema = createParser(z.object({ list: z.array(MilestoneBoxRawSchema) }), ({ list }) => {
  return list.map(({ milestone }) => ({ milestone: parseMilestone(milestone) }))
}) as { parse(input: unknown): MilestoneListType }

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
