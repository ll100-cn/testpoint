import { Type } from "class-transformer"
import { Category } from "./Category"
import * as t from '@/lib/transforms'
import { Pagination } from "./Pagination"
import type { OmitByValue } from "utility-types"
import type { IssueTemplateSchema } from './schema/issue_template'

class IssueTemplateInput {
  id!: number
  label: string | null = null
  orderIndex: number | null = null
  templateId: number | null = null

  @Type(() => Date)
  createdAt!: Date

  @Type(() => Date)
  updatedAt!: Date
}
export class IssueTemplate implements IssueTemplateSchema {
  id!: number
  contentSuggestion: string | null = null

  @Type(() => Category)
  defaultCategory?: Category

  defaultCategoryId: number | null = null

  defaultPriority!: string
  defaultPriorityText!: string
  lookupByBuildForm!: boolean
  name!: string
  projectId!: number
  titleSuggestion: string | null = null

  inputs: IssueTemplateInput[] = []
}

export class IssueTemplateBoxImpl {
  @t.Klass(IssueTemplate) issueTemplate!: IssueTemplate
}

export type IssueTemplateBox = OmitByValue<IssueTemplateBoxImpl, Function>

export class IssueTemplatePage<Box extends IssueTemplateBox> extends Pagination<Box> {
  @t.Klass(IssueTemplateBoxImpl) list: Box[] = []
}