import { z } from 'zod'

import { DateTimeSchema, NullableInputStringSchema, NullableIntegerInputSchema, NullableStringSchema } from './_shared'

export const TestCaseLabelSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  description: NullableStringSchema,
}).transform((value) => ({
  id: value.id,
  name: value.name,
  description: value.description ?? null,
}))
export type TestCaseLabelType = z.output<typeof TestCaseLabelSchema>

export const TestCaseLabelBoxSchema = z.object({
  test_case_label: TestCaseLabelSchema,
}).transform((value) => ({
  testCaseLabel: value.test_case_label,
  test_case_label: value.test_case_label,
}))
export type TestCaseLabelBoxType = z.output<typeof TestCaseLabelBoxSchema>

export const TestCaseLabelListSchema = z.object({
  list: z.array(TestCaseLabelBoxSchema),
}).transform(({ list }) => list)
export type TestCaseLabelListType = z.output<typeof TestCaseLabelListSchema>

export const TestCaseLabelPageSchema = z.object({
  list: z.array(TestCaseLabelBoxSchema),
  cases_counts: z.record(z.string(), z.number().int()).optional(),
}).transform((value) => ({
  list: value.list,
  casesCounts: value.cases_counts ?? {},
}))
export type TestCaseLabelPageType = z.output<typeof TestCaseLabelPageSchema>

export const TestCaseLabelBodySchema = z.object({
  name: NullableInputStringSchema.optional(),
  description: NullableInputStringSchema.optional(),
}).passthrough()
export type TestCaseLabelBodyType = z.output<typeof TestCaseLabelBodySchema>

export const RequirementSchema = z.object({
  id: z.number().int(),
  scene_id: z.number().int().nullable().optional(),
  title: z.string(),
  description: NullableStringSchema,
  upstream_ids: z.array(z.number().int()),
  platform_ids: z.array(z.number().int()),
  label_ids: z.array(z.number().int()),
  label_descriptions: z.record(z.string(), z.string()).nullable().optional(),
  updated_at: DateTimeSchema,
}).transform((value) => ({
  id: value.id,
  sceneId: value.scene_id ?? null,
  title: value.title,
  description: value.description ?? null,
  upstreamIds: value.upstream_ids,
  platformIds: value.platform_ids,
  labelIds: value.label_ids,
  labelDescriptions: value.label_descriptions ?? {},
  updatedAt: value.updated_at,
}))
export type RequirementType = z.output<typeof RequirementSchema>

export const RequirementBoxSchema = z.object({
  requirement: RequirementSchema,
})
export type RequirementBoxType = z.output<typeof RequirementBoxSchema>

export const RequirementStatSchema = z.object({
  id: z.number().int(),
  test_cases_count: z.number().int(),
}).transform((value) => ({
  id: value.id,
  test_cases_count: value.test_cases_count,
}))
export type RequirementStatType = z.output<typeof RequirementStatSchema>

export const RequirementListSchema = z.object({
  list: z.array(RequirementBoxSchema),
}).transform(({ list }) => list)
export type RequirementListType = z.output<typeof RequirementListSchema>

export const RequirementPageSchema = z.object({
  list: z.array(RequirementBoxSchema),
  requirement_stats: z.array(RequirementStatSchema).optional(),
}).transform((value) => ({
  list: value.list,
  requirementStats: value.requirement_stats ?? [],
}))
export type RequirementPageType = z.output<typeof RequirementPageSchema>

export const RequirementBodySchema = z.object({
  scene_id: NullableIntegerInputSchema.optional(),
  title: NullableInputStringSchema.optional(),
  description: NullableInputStringSchema.optional(),
  platform_ids: z.array(NullableIntegerInputSchema).optional(),
  upstream_ids: z.array(NullableIntegerInputSchema).optional(),
  label_ids: z.array(NullableIntegerInputSchema).optional(),
  label_descriptions: z.record(z.string(), z.string()).optional(),
}).transform((value) => ({
  ...value,
  platform_ids: (value.platform_ids ?? []).filter((it): it is number => it != null),
  upstream_ids: (value.upstream_ids ?? []).filter((it): it is number => it != null),
  label_ids: (value.label_ids ?? []).filter((it): it is number => it != null),
}))
export type RequirementBodyType = z.output<typeof RequirementBodySchema>

export const RoadmapSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  created_at: DateTimeSchema,
  updated_at: DateTimeSchema,
}).transform((value) => ({
  id: value.id,
  title: value.title,
  createdAt: value.created_at,
  updatedAt: value.updated_at,
}))
export type RoadmapType = z.output<typeof RoadmapSchema>

export const RoadmapBoxSchema = z.object({
  roadmap: RoadmapSchema,
})
export type RoadmapBoxType = z.output<typeof RoadmapBoxSchema>

export const RoadmapListSchema = z.object({
  list: z.array(RoadmapBoxSchema),
}).transform(({ list }) => list)
export type RoadmapListType = z.output<typeof RoadmapListSchema>

export const RoadmapBodySchema = z.object({
  title: NullableInputStringSchema.optional(),
}).passthrough()
export type RoadmapBodyType = z.output<typeof RoadmapBodySchema>

export const SceneSchema = z.object({
  id: z.number().int(),
  name: z.string(),
})
export type SceneType = z.output<typeof SceneSchema>

export const SceneBoxSchema = z.object({
  scene: SceneSchema,
})
export type SceneBoxType = z.output<typeof SceneBoxSchema>

export const SceneListSchema = z.object({
  list: z.array(SceneBoxSchema),
}).transform(({ list }) => list)
export type SceneListType = z.output<typeof SceneListSchema>

export const SceneBodySchema = z.object({
  name: NullableInputStringSchema.optional(),
}).passthrough()
export type SceneBodyType = z.output<typeof SceneBodySchema>

export const StoryboardSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  main_axle: z.string().nullable().optional(),
  description: NullableStringSchema,
  positions: z.record(z.string(), z.unknown()).optional(),
}).transform((value) => ({
  id: value.id,
  title: value.title,
  main_axle: value.main_axle ?? null,
  description: value.description ?? null,
  positions: value.positions ?? {},
}))
export type StoryboardType = z.output<typeof StoryboardSchema>

export const StoryboardBoxSchema = z.object({
  storyboard: StoryboardSchema,
})
export type StoryboardBoxType = z.output<typeof StoryboardBoxSchema>

export const StoryboardListSchema = z.object({
  list: z.array(StoryboardBoxSchema),
}).transform(({ list }) => list)
export type StoryboardListType = z.output<typeof StoryboardListSchema>

export const StoryboardBodySchema = z.object({
  title: NullableInputStringSchema.optional(),
  description: NullableInputStringSchema.optional(),
  main_axle: NullableInputStringSchema.optional(),
  positions: z.record(z.string(), z.unknown()).optional(),
}).passthrough()
export type StoryboardBodyType = z.output<typeof StoryboardBodySchema>

export const IssueActivityChartSchema = z.object({
  issues_confirm_time: z.array(z.unknown()),
}).transform((value) => ({
  issuesConfirmTime: value.issues_confirm_time,
}))
export type IssueActivityChartType = z.output<typeof IssueActivityChartSchema>

export const IssueCreatorChartSchema = z.object({
  issue_counts: z.array(z.object({
    creator_id: z.number().int(),
    category_id: z.number().int().nullable().optional(),
    count: z.number().int(),
  }).transform((item) => ({
    creatorId: item.creator_id,
    creator_id: item.creator_id,
    categoryId: item.category_id ?? null,
    category_id: item.category_id ?? null,
    count: item.count,
  }))),
}).transform((value) => ({
  issueCounts: value.issue_counts,
}))
export type IssueCreatorChartType = z.output<typeof IssueCreatorChartSchema>
