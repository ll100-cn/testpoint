import { z } from 'zod'

import { DateTimeSchema, NullableIntegerSchema } from './_shared'

function withTaskMethods<T extends { ignoreAt?: Date | null }>(task: T) {
  return {
    ...task,
    is_ignored() {
      return task.ignoreAt != null
    },
  }
}

export const TaskSchema = z.object({
  id: z.number().int(),
  plan_id: NullableIntegerSchema,
  state: z.string().optional(),
  ignore_at: DateTimeSchema.nullable().optional().transform((value) => value ?? null),
  phase_id: NullableIntegerSchema,
  test_case_id: NullableIntegerSchema,
  finished: z.boolean(),
}).transform((value) => withTaskMethods({
  id: value.id,
  planId: value.plan_id ?? undefined,
  state: value.state ?? 'pending',
  ignoreAt: value.ignore_at ?? undefined,
  phaseId: value.phase_id ?? undefined,
  testCaseId: value.test_case_id ?? undefined,
  finished: value.finished,
}))
export type TaskType = z.output<typeof TaskSchema>
