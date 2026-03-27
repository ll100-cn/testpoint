import { z } from 'zod'

import { buildListParser, createParser, DateTimeSchema, NullableInputStringSchema, NullableIntegerInputSchema, NullableStringSchema } from './_shared'

export const TestCaseLabelSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  description: NullableStringSchema,
})
export type TestCaseLabelType = z.output<typeof TestCaseLabelSchema>

export const TestCaseLabelBoxSchema = z.object({
  test_case_label: TestCaseLabelSchema,
})
export type TestCaseLabelBoxType = z.output<typeof TestCaseLabelBoxSchema>

export const TestCaseLabelListSchema = buildListParser(TestCaseLabelBoxSchema)
export type TestCaseLabelListType = TestCaseLabelBoxType[]

export const TestCaseLabelPageSchema = z.object({
  list: z.array(TestCaseLabelBoxSchema),
  cases_counts: z.record(z.string(), z.number().int()).optional(),
})
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
  label_descriptions: z.preprocess((value) => value ?? {}, z.record(z.string(), z.string())),
  updated_at: DateTimeSchema,
})
export type RequirementType = z.output<typeof RequirementSchema>

export const RequirementBoxSchema = z.object({
  requirement: RequirementSchema,
})
export type RequirementBoxType = z.output<typeof RequirementBoxSchema>

export const RequirementStatSchema = z.object({
  id: z.number().int(),
  test_cases_count: z.number().int(),
})
export type RequirementStatType = z.output<typeof RequirementStatSchema>

export const RequirementListSchema = buildListParser(RequirementBoxSchema)
export type RequirementListType = RequirementBoxType[]

export const RequirementPageSchema = z.object({
  list: z.array(RequirementBoxSchema),
  requirement_stats: z.array(RequirementStatSchema).optional(),
})
export type RequirementPageType = z.output<typeof RequirementPageSchema>

const RequirementBodyRawSchema = z.object({
  scene_id: NullableIntegerInputSchema.optional(),
  title: NullableInputStringSchema.optional(),
  description: NullableInputStringSchema.optional(),
  platform_ids: z.array(NullableIntegerInputSchema).optional(),
  upstream_ids: z.array(NullableIntegerInputSchema).optional(),
  label_ids: z.array(NullableIntegerInputSchema).optional(),
  label_descriptions: z.record(z.string(), z.string()).optional(),
})

export const RequirementBodySchema = createParser(RequirementBodyRawSchema, (value) => ({
  ...value,
  platform_ids: (value.platform_ids ?? []).filter((it): it is number => it != null),
  upstream_ids: (value.upstream_ids ?? []).filter((it): it is number => it != null),
  label_ids: (value.label_ids ?? []).filter((it): it is number => it != null),
}))
export type RequirementBodyType = z.output<typeof RequirementBodyRawSchema>

export const RoadmapSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  created_at: DateTimeSchema,
  updated_at: DateTimeSchema,
})
export type RoadmapType = z.output<typeof RoadmapSchema>

export const RoadmapBoxSchema = z.object({
  roadmap: RoadmapSchema,
})
export type RoadmapBoxType = z.output<typeof RoadmapBoxSchema>

export const RoadmapListSchema = buildListParser(RoadmapBoxSchema)
export type RoadmapListType = RoadmapBoxType[]

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

export const SceneListSchema = buildListParser(SceneBoxSchema)
export type SceneListType = SceneBoxType[]

export const SceneBodySchema = z.object({
  name: NullableInputStringSchema.optional(),
}).passthrough()
export type SceneBodyType = z.output<typeof SceneBodySchema>

export const StoryboardSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  main_axle: z.string().nullable().optional(),
  description: NullableStringSchema,
  positions: z.preprocess((value) => value ?? {}, z.record(z.string(), z.unknown())),
})
export type StoryboardType = z.output<typeof StoryboardSchema>

export const StoryboardBoxSchema = z.object({
  storyboard: StoryboardSchema,
})
export type StoryboardBoxType = z.output<typeof StoryboardBoxSchema>

export const StoryboardListSchema = buildListParser(StoryboardBoxSchema)
export type StoryboardListType = StoryboardBoxType[]

export const StoryboardBodySchema = z.object({
  title: NullableInputStringSchema.optional(),
  description: NullableInputStringSchema.optional(),
  main_axle: NullableInputStringSchema.optional(),
  positions: z.record(z.string(), z.unknown()).optional(),
}).passthrough()
export type StoryboardBodyType = z.output<typeof StoryboardBodySchema>

export const IssueActivityChartSchema = z.object({
  issues_confirm_time: z.array(z.unknown()),
})
export type IssueActivityChartType = z.output<typeof IssueActivityChartSchema>

export const IssueCreatorChartSchema = z.object({
  issue_counts: z.array(z.object({
    creator_id: z.number().int(),
    category_id: z.number().int().nullable().optional(),
    count: z.number().int(),
  })),
})
export type IssueCreatorChartType = z.output<typeof IssueCreatorChartSchema>
