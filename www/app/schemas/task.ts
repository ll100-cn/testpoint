import { z } from 'zod'

import { DateTimeSchema, NullableIntegerSchema } from './_shared'

function withTaskMethods<T extends { ignore_at?: Date | null }>(task: T) {
  return {
    ...task,
    is_ignored() {
      return task.ignore_at != null
    },
  }
}

export const TaskSchema = z.object({
  id: z.number().int(),
  plan_id: NullableIntegerSchema,
  state: z.string().optional(),
  ignore_at: DateTimeSchema.nullable().optional(),
  phase_id: NullableIntegerSchema,
  test_case_id: NullableIntegerSchema,
  finished: z.boolean(),
})

export type TaskType = z.output<typeof TaskSchema> & {
  is_ignored(): boolean
}

export function parseTask(value: z.output<typeof TaskSchema>): TaskType {
  return withTaskMethods({
    id: value.id,
    plan_id: value.plan_id ?? undefined,
    state: value.state ?? 'pending',
    ignore_at: value.ignore_at ?? undefined,
    phase_id: value.phase_id ?? undefined,
    test_case_id: value.test_case_id ?? undefined,
    finished: value.finished,
  })
}
