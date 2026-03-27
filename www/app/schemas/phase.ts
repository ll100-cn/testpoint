import { z } from 'zod'

import { NullableInputStringSchema } from './_shared'

const StateCountsSchema = z.object({
  pass: z.coerce.number().optional().default(0),
  failure: z.coerce.number().optional().default(0),
  pending: z.coerce.number().optional().default(0),
})

export const PhaseSchema = z.object({
  id: z.number().int(),
  title: z.string(),
})
export type PhaseType = z.output<typeof PhaseSchema>

export const PhaseInfoSchema = z.object({
  phase: PhaseSchema,
  upshots_state_counts: StateCountsSchema.optional().default({ pass: 0, failure: 0, pending: 0 }),
})
export type PhaseInfoType = z.output<typeof PhaseInfoSchema>

export const PhaseBoxSchema = z.object({
  phase: PhaseSchema,
})
export type PhaseBoxType = z.output<typeof PhaseBoxSchema>

export const PhaseBodySchema = z.object({
  title: NullableInputStringSchema.optional(),
  release_revision: NullableInputStringSchema.optional(),
}).passthrough()
export type PhaseBodyType = z.output<typeof PhaseBodySchema>
