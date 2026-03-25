import type { CategorySchema } from './category'

export interface IssueStateSchema {
  stage: string
  count: number
  category?: CategorySchema
  projectId: number
  categoryId?: number | null
}
