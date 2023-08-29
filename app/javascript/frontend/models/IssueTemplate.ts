import { Type } from "class-transformer"
import { Category } from "./Category"

class IssueTemplateInput {
  id: number
  label: string
  order_index: number
  template_id: number

  @Type(() => Date)
  created_at: Date

  @Type(() => Date)
  updated_at: Date
}
export class IssueTemplate {
  id: number
  content_suggestion: string

  @Type(() => Category)
  default_category: Category

  default_category_id: number

  default_priority: string
  default_priority_text: string
  lookup_by_build_form: boolean
  name: string
  project_id: number
  title_suggestion: string

  inputs: any[]
}
