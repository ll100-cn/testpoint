import { z } from 'zod'

import { NullableIntegerSchema } from './_shared'
import { CategorySchema } from './category'

export const IssueStateSchema = z.object({
  project_id: z.number().int(),
  stage: z.string(),
  category_id: NullableIntegerSchema,
  count: z.number().int(),
  category: CategorySchema.optional(),
}).transform((value) => ({
  projectId: value.project_id,
  stage: value.stage,
  categoryId: value.category_id,
  count: value.count,
  category: value.category,
}))
export type IssueStateType = z.output<typeof IssueStateSchema>
