import { z } from 'zod'

import { NullableInputStringSchema } from './_shared'

export const PhaseSchema = z.object({
  id: z.number().int(),
  title: z.string(),
})
export type PhaseType = z.output<typeof PhaseSchema>

function normalizeStateCounts(value: Record<string, unknown> | null | undefined) {
  const counts = value ?? {}

  return {
    pass: Number(counts.pass ?? 0),
    failure: Number(counts.failure ?? 0),
    pending: Number(counts.pending ?? 0),
  }
}

export const PhaseInfoSchema = z.object({
  phase: PhaseSchema,
  upshots_state_counts: z.record(z.string(), z.unknown()).optional(),
}).transform((value) => ({
  phase: value.phase,
  upshotsStateCounts: normalizeStateCounts(value.upshots_state_counts),
}))
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
