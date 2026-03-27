import { z } from 'zod'

import { createParser, DateTimeSchema, buildListSchema, NullableInputStringSchema, NullableStringSchema } from './_shared'
import { IssueSchema, parseIssue, type IssueType } from './issue'
import { parseTask, TaskSchema, type TaskType } from './task'
import { TestCaseSchema, type TestCaseType } from './test_case'

export const TaskUpshotSchema = z.object({
  id: z.number().int(),
  state: z.string().optional(),
  state_override: NullableStringSchema,
  state_changed_at: DateTimeSchema.nullable().optional(),
  phase_id: z.number().int().nullable().optional(),
  content: NullableStringSchema,
  created_at: DateTimeSchema,
})
export type TaskUpshotType = z.output<typeof TaskUpshotSchema>

const TaskUpshotBoxRawSchema = z.object({
  task_upshot: TaskUpshotSchema,
  task: TaskSchema.nullable().optional(),
  test_case: TestCaseSchema.nullable().optional(),
})

export type TaskUpshotBoxType = {
  task_upshot: TaskUpshotType
  task: TaskType | null
  test_case: TestCaseType | null
}

export const TaskUpshotBoxSchema = createParser(TaskUpshotBoxRawSchema, (value) => ({
  task_upshot: value.task_upshot,
  task: value.task ? parseTask(value.task) : null,
  test_case: value.test_case ?? null,
}))

export const TaskUpshotInfoBoxSchema = TaskUpshotBoxSchema
export type TaskUpshotInfoBoxType = TaskUpshotBoxType

const TaskUpshotPageRawSchema = buildListSchema(TaskUpshotBoxRawSchema)
export type TaskUpshotPageType = { list: TaskUpshotBoxType[] }
export const TaskUpshotPageSchema = createParser(TaskUpshotPageRawSchema, (value) => ({
  list: value.list.map((item) => TaskUpshotBoxSchema.parse(item)),
}))

const TaskBoxRawSchema = z.object({
  task: TaskSchema,
  task_upshots: z.array(TaskUpshotSchema).nullable().optional(),
  issues: z.array(IssueSchema).nullable().optional(),
})

export type TaskBoxType = {
  task: TaskType
  task_upshots: TaskUpshotType[] | null | undefined
  issues: IssueType[] | null | undefined
}

export const TaskBoxSchema = createParser(TaskBoxRawSchema, (value) => ({
  task: parseTask(value.task),
  task_upshots: value.task_upshots,
  issues: value.issues?.map(parseIssue),
}))

export const TaskInfoBoxSchema = TaskBoxSchema
export type TaskInfoBoxType = TaskBoxType

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
