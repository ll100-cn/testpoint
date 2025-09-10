import type { IssueTemplateSchema } from './issue_template'

export interface IssueSurveySchema {
  id: number
  state: string
  values: Record<string, any>
  remark?: string | null
  template: IssueTemplateSchema
  issueId: number
  templateId: number
  createdAt: Date
  updatedAt: Date
}
