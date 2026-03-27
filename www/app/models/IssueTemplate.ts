import { Type } from "class-transformer"
import { Category } from "./Category"
import * as t from '@/lib/transforms'
import { Pagination } from "./Pagination"
import type { OmitByValue } from "utility-types"
import type { IssueTemplateSchema } from './schema/issue_template'

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
export class IssueTemplate implements IssueTemplateSchema {
  id!: number
  content_suggestion: string | null = null

  @Type(() => Category)
  default_category?: Category

  default_category_id: number | null = null

  default_priority!: string
  default_priority_text!: string
  lookup_by_build_form!: boolean
  name!: string
  project_id!: number
  title_suggestion: string | null = null

  inputs: IssueTemplateInput[] = []
}

export class IssueTemplateBoxImpl {
  @t.Klass(IssueTemplate) issue_template!: IssueTemplate
}

export type IssueTemplateBox = OmitByValue<IssueTemplateBoxImpl, Function>

export class IssueTemplatePage<Box extends IssueTemplateBox> extends Pagination<Box> {
  @t.Klass(IssueTemplateBoxImpl) list: Box[] = []
}
