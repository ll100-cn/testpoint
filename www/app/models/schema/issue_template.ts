import type { CategorySchema } from './category'

export interface IssueTemplateSchema {
  id: number
  name: string
  inputs: unknown[]
  project_id: number
  lookup_by_build_form: boolean
  title_suggestion?: string | null
  content_suggestion?: string | null
  default_category_id?: number | null
  default_priority: string
  default_priority_text: string
  default_category?: CategorySchema
}
