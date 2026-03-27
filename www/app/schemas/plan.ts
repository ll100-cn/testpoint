import { z } from 'zod'

import { DateTimeSchema, NullableInputStringSchema, NullableIntegerInputSchema, NullableIntegerSchema } from './_shared'
import { MilestoneSchema } from './milestone'
import { PhaseInfoSchema } from './phase'
import { PlatformSchema } from './platform'

const StateCountsSchema = z.object({
  pass: z.coerce.number().optional().default(0),
  failure: z.coerce.number().optional().default(0),
  pending: z.coerce.number().optional().default(0),
})

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
})
export type PlanType = z.output<typeof PlanSchema>

const PlanBoxRawSchema = z.object({
  plan: PlanSchema,
  phase_infos: z.array(PhaseInfoSchema).optional().default([]),
})

export const PlanBoxSchema = PlanBoxRawSchema
export type PlanBoxType = z.output<typeof PlanBoxSchema>

export const PlanInfoBoxSchema = PlanBoxSchema
export type PlanInfoBoxType = z.output<typeof PlanInfoBoxSchema>

export const PlanPageSchema = z.object({
  total_count: z.number().int(),
  offset: z.number().int(),
  limit: z.number().int(),
  list: z.array(PlanBoxSchema),
  tasks_state_counts: z.preprocess((value) => value ?? {}, z.record(z.string(), z.preprocess((item) => item ?? {}, StateCountsSchema))),
})
export type PlanPageType = z.output<typeof PlanPageSchema>

export const PlanBodySchema = z.object({
  title: NullableInputStringSchema,
  platform_id: NullableIntegerInputSchema,
  milestone_id: NullableIntegerInputSchema.optional(),
  role_names: z.array(z.string()).optional().default([]),
}).passthrough()
export type PlanBodyType = z.output<typeof PlanBodySchema>
