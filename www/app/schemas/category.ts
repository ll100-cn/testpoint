import { z } from 'zod'

import { buildListParser, NullableInputStringSchema, NullableStringSchema } from './_shared'

export const CategorySchema = z.object({
  id: z.number().int(),
  name: z.string(),
  description: NullableStringSchema,
  color: NullableStringSchema,
  project_id: z.number().int(),
  default_as_test_failure: z.boolean(),
})
export type CategoryType = z.output<typeof CategorySchema>

export const CategoryBoxSchema = z.object({
  category: CategorySchema,
  issue_count: z.number().int().optional(),
})
export type CategoryBoxType = z.output<typeof CategoryBoxSchema>

export const CategoryListSchema = buildListParser(CategoryBoxSchema)
export type CategoryListType = CategoryBoxType[]

export const CategoryPageSchema = z.object({
  list: z.array(CategoryBoxSchema),
  issues_counts: z.record(z.string(), z.number().int()).optional(),
})
export type CategoryPageType = z.output<typeof CategoryPageSchema>

export const CategoryBodySchema = z.object({
  name: NullableInputStringSchema.optional(),
  description: NullableInputStringSchema.optional(),
  color: NullableInputStringSchema.optional(),
}).passthrough()
export type CategoryBodyType = z.output<typeof CategoryBodySchema>
