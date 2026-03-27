import { z } from 'zod'
import { NullableIntegerInputSchema } from '@/schemas/_shared'

export const SearchSchema = z.object({
  stage: z.string().default('pending'),
  keyword: z.string().optional(),
  sorts: z.string().optional(),
})

export const FilterSchema = z.object({
  category_id_eq: NullableIntegerInputSchema.optional(),
  milestone_id_eq: NullableIntegerInputSchema.optional(),
  assignee_id_eq: NullableIntegerInputSchema.optional(),
  creator_id_eq: NullableIntegerInputSchema.optional(),
  task_id_is: z.string().optional(),
})

export type Search2 = z.infer<typeof SearchSchema>
export type Filter2 = z.infer<typeof FilterSchema>

export function parseSearch(raw: unknown): Search2 {
  return SearchSchema.parse(raw)
}

export function parseFilter(raw: unknown): Filter2 {
  return FilterSchema.parse(raw)
}
