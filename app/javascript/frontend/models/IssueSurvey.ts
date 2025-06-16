import * as t from '@/lib/transforms'
import { IssueTemplate } from './IssueTemplate'
import { Pagination } from './Pagination'
import type { OmitByValue } from "utility-types"

export class IssueSurvey {
  @t.Number id!: number
  @t.Number issue_id!: number
  @t.Number template_id!: number
  @t.String state!: string
  values: Record<number, string> = {}

  @t.Date created_at!: Date
  @t.Date updated_at!: Date
  @t.String remark: string | null = null

  @t.Klass(IssueTemplate) template!: IssueTemplate
}

export class IssueSurveyBoxImpl {
  @t.Klass(IssueSurvey) issue_survey!: IssueSurvey
}

export type IssueSurveyBox = OmitByValue<IssueSurveyBoxImpl, Function>

export class IssueSurveyPage<Box extends IssueSurveyBox> extends Pagination<Box> {
  @t.Klass(IssueSurveyBoxImpl) list: Box[] = []
}