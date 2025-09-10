import * as t from '@/lib/transforms'
import { IssueTemplate } from './IssueTemplate'
import { Pagination } from './Pagination'
import type { OmitByValue } from "utility-types"
import type { IssueSurveySchema } from './schema/issue_survey'

export class IssueSurvey implements IssueSurveySchema {
  @t.Number id!: number
  @t.Number issueId!: number
  @t.Number templateId!: number
  @t.String state!: string
  values: Record<number, string> = {}

  @t.Date createdAt!: Date
  @t.Date updatedAt!: Date
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