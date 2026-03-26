import { z } from 'zod'

import { DateTimeSchema, buildListSchema, NullableInputStringSchema, NullableStringSchema } from './_shared'
import { IssueSchema } from './issue'
import { TaskSchema } from './task'
import { TestCaseSchema } from './test_case'

export const TaskUpshotSchema = z.object({
  id: z.number().int(),
  state: z.string().optional(),
  state_override: NullableStringSchema,
  state_changed_at: DateTimeSchema.nullable().optional().transform((value) => value ?? undefined),
  phase_id: z.number().int().nullable().optional().transform((value) => value ?? undefined),
  content: NullableStringSchema,
  created_at: DateTimeSchema,
}).transform((value) => ({
  id: value.id,
  state: value.state,
  stateOverride: value.state_override ?? null,
  stateChangedAt: value.state_changed_at,
  phaseId: value.phase_id,
  content: value.content ?? undefined,
  createdAt: value.created_at,
}))
export type TaskUpshotType = z.output<typeof TaskUpshotSchema>

const TaskUpshotBoxRawSchema = z.object({
  task_upshot: TaskUpshotSchema,
  task: TaskSchema.nullable().optional(),
  test_case: TestCaseSchema.nullable().optional(),
})

export const TaskUpshotBoxSchema = TaskUpshotBoxRawSchema.transform((value) => ({
  taskUpshot: value.task_upshot,
  task: value.task ?? null,
  testCase: value.test_case ?? null,
}))
export type TaskUpshotBoxType = z.output<typeof TaskUpshotBoxSchema>

export const TaskUpshotInfoBoxSchema = TaskUpshotBoxSchema
export type TaskUpshotInfoBoxType = z.output<typeof TaskUpshotInfoBoxSchema>

export const TaskUpshotPageSchema = buildListSchema(TaskUpshotBoxSchema)
export type TaskUpshotPageType = z.output<typeof TaskUpshotPageSchema>

const TaskBoxRawSchema = z.object({
  task: TaskSchema,
  task_upshots: z.array(TaskUpshotSchema).nullable().optional(),
  issues: z.array(IssueSchema).nullable().optional(),
})

export const TaskBoxSchema = TaskBoxRawSchema.transform((value) => ({
  task: value.task,
  taskUpshots: value.task_upshots ?? null,
  issues: value.issues ?? null,
}))
export type TaskBoxType = z.output<typeof TaskBoxSchema>

export const TaskInfoBoxSchema = TaskBoxSchema
export type TaskInfoBoxType = z.output<typeof TaskInfoBoxSchema>

export const TaskUpshotContentBodySchema = z.object({
  content: NullableInputStringSchema.optional(),
}).passthrough()
export type TaskUpshotContentBodyType = z.output<typeof TaskUpshotContentBodySchema>

export const TaskUpshotStateBodySchema = z.object({
  task_upshot: z.object({
    state_override: NullableInputStringSchema,
  }).passthrough(),
}).passthrough()
export type TaskUpshotStateBodyType = z.output<typeof TaskUpshotStateBodySchema>
