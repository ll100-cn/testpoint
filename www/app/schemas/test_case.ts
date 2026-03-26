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
  requirement_id: NullableIntegerSchema,
  roadmap_id: NullableIntegerSchema,
}).transform((value) => ({
  id: value.id,
  title: value.title,
  content: value.content,
  sceneName: value.scene_name,
  roleName: value.role_name,
  groupName: value.group_name,
  archived: value.archived,
  projectId: value.project_id,
  platformIds: value.platform_ids,
  labelIds: value.label_ids,
  scenePath: value.scene_path,
  updatedAt: value.updated_at,
  storyboardId: null,
  requirementId: value.requirement_id,
  roadmapId: value.roadmap_id,
}))
export type TestCaseType = z.output<typeof TestCaseSchema>

export const TestCaseBoxSchema = z.object({
  test_case: TestCaseSchema,
}).transform((value) => ({
  testCase: value.test_case,
}))
export type TestCaseBoxType = z.output<typeof TestCaseBoxSchema>

export const TestCaseListSchema = buildListSchema(TestCaseBoxSchema)
export type TestCaseListType = z.output<typeof TestCaseListSchema>

export const TestCaseBodySchema = z.object({
  title: NullableInputStringSchema,
  content: NullableInputStringSchema,
  role_name: NullableInputStringSchema,
  scene_name: NullableInputStringSchema,
  group_name: NullableInputStringSchema,
  platform_ids: z.array(NullableIntegerInputSchema).transform((value) => value.filter((it): it is number => it != null)),
  label_ids: z.array(NullableIntegerInputSchema).transform((value) => value.filter((it): it is number => it != null)),
  storyboard_id: NullableIntegerInputSchema,
  requirement_id: NullableIntegerInputSchema,
})
export type TestCaseBodyType = z.output<typeof TestCaseBodySchema>
