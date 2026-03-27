import type { MemberSchema } from './member'
import type { CategorySchema } from './category'
import type { MilestoneSchema } from './milestone'
import type { ProjectSchema } from './project'

export interface IssueActivitySchema {
  id: number
  property: string
  member?: MemberSchema
  issue_id: number
  member_id: number
  before_value?: string | null
  after_value?: string | null
  created_at: Date
  updated_at: Date
  before_category?: CategorySchema
  after_category?: CategorySchema
  before_creator?: MemberSchema
  after_creator?: MemberSchema
  before_assignee?: MemberSchema
  after_assignee?: MemberSchema
  before_milestone?: MilestoneSchema
  after_milestone?: MilestoneSchema
  before_project?: ProjectSchema
  after_project?: ProjectSchema
}
