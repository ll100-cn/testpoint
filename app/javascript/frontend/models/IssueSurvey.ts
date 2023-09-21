import * as t from '@/lib/transforms'
import { IssueTemplate } from './IssueTemplate'

export class IssueSurvey {
  @t.Number id: number
  @t.Number issue_id: number
  @t.Number template_id: number
  @t.String state: string
  values: Record<number, string>

  @t.Date created_at: Date
  @t.Date updated_at: Date
  @t.String remark: string

  @t.Klass(IssueTemplate) template: IssueTemplate
}
