import { z } from 'zod'

import { NullableInputStringSchema, NullableStringSchema } from './_shared'

export const CategorySchema = z.object({
  id: z.number().int(),
  name: z.string(),
  description: NullableStringSchema,
  color: NullableStringSchema,
  project_id: z.number().int(),
  default_as_test_failure: z.boolean(),
}).transform((value) => ({
  id: value.id,
  name: value.name,
  description: value.description ?? undefined,
  color: value.color ?? undefined,
  projectId: value.project_id,
  defaultAsTestFailure: value.default_as_test_failure,
}))
export type CategoryType = z.output<typeof CategorySchema>

export const CategoryBoxSchema = z.object({
  category: CategorySchema,
  issue_count: z.number().int().optional(),
}).transform((value) => ({
  category: value.category,
  issueCount: value.issue_count ?? null,
}))
export type CategoryBoxType = z.output<typeof CategoryBoxSchema>

export const CategoryListSchema = z.object({
  list: z.array(CategoryBoxSchema),
}).transform(({ list }) => list)
export type CategoryListType = z.output<typeof CategoryListSchema>

export const CategoryPageSchema = z.object({
  list: z.array(CategoryBoxSchema),
  issues_counts: z.record(z.string(), z.number().int()).optional(),
}).transform((value) => ({
  list: value.list,
  issuesCounts: value.issues_counts ?? {},
}))
export type CategoryPageType = z.output<typeof CategoryPageSchema>

export const CategoryBodySchema = z.object({
  name: NullableInputStringSchema.optional(),
  description: NullableInputStringSchema.optional(),
  color: NullableInputStringSchema.optional(),
}).passthrough()
export type CategoryBodyType = z.output<typeof CategoryBodySchema>
