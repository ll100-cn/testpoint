import type { CategorySchema } from './category'

export interface IssueStateSchema {
  stage: string
  count: number
  category?: CategorySchema
  project_id: number
  category_id?: number | null
}
