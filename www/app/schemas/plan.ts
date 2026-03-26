import { z } from 'zod'

import { DateTimeSchema, NullableInputStringSchema, NullableIntegerInputSchema, NullableIntegerSchema } from './_shared'
import { MilestoneSchema } from './milestone'
import { PhaseInfoSchema } from './phase'
import { PlatformSchema } from './platform'

function normalizeStateCounts(value: Record<string, unknown> | null | undefined) {
  const counts = value ?? {}

  return {
    pass: Number(counts.pass ?? 0),
    failure: Number(counts.failure ?? 0),
    pending: Number(counts.pending ?? 0),
  }
}

export const PlanSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  created_at: DateTimeSchema,
  creator_id: z.number().int(),
  platform_id: z.number().int(),
  project_id: z.number().int(),
  milestone_id: NullableIntegerSchema,
  creator_name: z.string(),
  milestone: MilestoneSchema.optional(),
  platform: PlatformSchema,
}).transform((value) => ({
  id: value.id,
  title: value.title,
  createdAt: value.created_at,
  creatorId: value.creator_id,
  platformId: value.platform_id,
  projectId: value.project_id,
  milestoneId: value.milestone_id ?? undefined,
  creatorName: value.creator_name,
  milestone: value.milestone ?? null,
  platform: value.platform,
}))
export type PlanType = z.output<typeof PlanSchema>

const PlanBoxRawSchema = z.object({
  plan: PlanSchema,
  phase_infos: z.array(PhaseInfoSchema).optional().default([]),
})

export const PlanBoxSchema = PlanBoxRawSchema.transform((value) => ({
  plan: value.plan,
  phaseInfos: value.phase_infos,
}))
export type PlanBoxType = z.output<typeof PlanBoxSchema>

export const PlanInfoBoxSchema = PlanBoxSchema
export type PlanInfoBoxType = z.output<typeof PlanInfoBoxSchema>

export const PlanPageSchema = z.object({
  total_count: z.number().int(),
  offset: z.number().int(),
  limit: z.number().int(),
  list: z.array(PlanBoxSchema),
  tasks_state_counts: z.record(z.string(), z.record(z.string(), z.unknown())).optional(),
}).transform(({ total_count, offset, limit, list, tasks_state_counts }) => ({
  list,
  offset,
  limit,
  totalCount: total_count,
  current_page: Math.floor(offset / limit) + 1,
  total_pages: total_count === 0 ? 1 : Math.ceil(total_count / limit),
  tasksStateCounts: Object.fromEntries(
    Object.entries(tasks_state_counts ?? {}).map(([planId, counts]) => [planId, normalizeStateCounts(counts)]),
  ),
}))
export type PlanPageType = z.output<typeof PlanPageSchema>

export const PlanBodySchema = z.object({
  title: NullableInputStringSchema,
  platform_id: NullableIntegerInputSchema,
  milestone_id: NullableIntegerInputSchema.optional(),
  role_names: z.array(z.string()).optional().default([]),
}).passthrough()
export type PlanBodyType = z.output<typeof PlanBodySchema>
