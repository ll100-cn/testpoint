import { z } from 'zod'

import { BooleanOrNullSchema, NullableStringSchema, pathArraySchema } from './_shared'

export const TestCaseStatSchema = z.object({
  archived: BooleanOrNullSchema,
  role_name: NullableStringSchema,
  scene_path: pathArraySchema(),
  count: z.number().int(),
  ignored: BooleanOrNullSchema,
}).transform((value) => ({
  archived: value.archived,
  roleName: value.role_name,
  scenePath: value.scene_path,
  count: value.count,
  ignored: value.ignored,
}))
export type TestCaseStatType = z.output<typeof TestCaseStatSchema>

export const TestCaseStatListSchema = z.array(TestCaseStatSchema)
export type TestCaseStatListType = z.output<typeof TestCaseStatListSchema>
