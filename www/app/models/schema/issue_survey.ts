import type { IssueTemplateSchema } from './issue_template'

export interface IssueSurveySchema {
  id: number
  state: string
  values: Record<string, any>
  remark?: string | null
  template: IssueTemplateSchema
  issue_id: number
  template_id: number
  created_at: Date
  updated_at: Date
}
