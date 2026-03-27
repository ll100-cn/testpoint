import { z } from 'zod'

import {
  DateTimeSchema,
  NullableInputStringSchema,
  NullableIntegerInputSchema,
  NullableIntegerSchema,
  NullableStringSchema,
  buildListSchema,
  pathArraySchema,
} from './_shared'

export const TestCaseSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  content: NullableStringSchema,
  scene_name: NullableStringSchema,
  role_name: NullableStringSchema,
  group_name: NullableStringSchema,
  archived: z.boolean(),
  project_id: z.number().int(),
  platform_ids: z.array(z.number().int()),
  label_ids: z.array(z.number().int()),
  scene_path: pathArraySchema(),
  updated_at: DateTimeSchema,
  storyboard_id: z.number().int().nullable().optional().default(null),
  requirement_id: NullableIntegerSchema,
  roadmap_id: NullableIntegerSchema,
})
export type TestCaseType = z.output<typeof TestCaseSchema>

export const TestCaseBoxSchema = z.object({
  test_case: TestCaseSchema,
})
export type TestCaseBoxType = z.output<typeof TestCaseBoxSchema>

export const TestCaseListSchema = buildListSchema(TestCaseBoxSchema)
export type TestCaseListType = z.output<typeof TestCaseListSchema>

export const TestCaseBodySchema = z.object({
  title: NullableInputStringSchema,
  content: NullableInputStringSchema,
  role_name: NullableInputStringSchema,
  scene_name: NullableInputStringSchema,
  group_name: NullableInputStringSchema,
  platform_ids: z.preprocess((value) => Array.isArray(value) ? value.filter((it) => it != null) : value, z.array(z.coerce.number().int())),
  label_ids: z.preprocess((value) => Array.isArray(value) ? value.filter((it) => it != null) : value, z.array(z.coerce.number().int())),
  storyboard_id: NullableIntegerInputSchema,
  requirement_id: NullableIntegerInputSchema,
})
export type TestCaseBodyType = z.output<typeof TestCaseBodySchema>
