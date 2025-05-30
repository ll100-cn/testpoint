import { Type } from "class-transformer"
import { Category } from "./Category"
import * as t from '@/lib/transforms'
import { Pagination } from "./Pagination"

class IssueTemplateInput {
  id!: number
  label: string | null = null
  order_index: number | null = null
  template_id: number | null = null

  @Type(() => Date)
  created_at!: Date

  @Type(() => Date)
  updated_at!: Date
}
export class IssueTemplate {
  id!: number
  content_suggestion: string | null = null

  @Type(() => Category)
  default_category: Category | null = null

  default_category_id: number | null = null

  default_priority: string | null = null
  default_priority_text: string | null = null
  lookup_by_build_form: boolean | null = null
  name: string | null = null
  project_id!: number
  title_suggestion: string | null = null

  inputs: IssueTemplateInput[] = []
}

export class IssueTemplateBox {
  @t.Klass(IssueTemplate) issue_template!: IssueTemplate
}

export class IssueTemplatePage<Box extends IssueTemplateBox> extends Pagination<Box> {
  @t.Klass(IssueTemplateBox) list: Box[] = []
}