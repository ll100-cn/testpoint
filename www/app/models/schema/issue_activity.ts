import type { MemberSchema } from './member'
import type { CategorySchema } from './category'
import type { MilestoneSchema } from './milestone'
import type { ProjectSchema } from './project'

export interface IssueActivitySchema {
  id: number
  property: string
  member?: MemberSchema
  issueId: number
  memberId: number
  beforeValue?: string | null
  afterValue?: string | null
  createdAt: Date
  updatedAt: Date
  beforeCategory?: CategorySchema
  afterCategory?: CategorySchema
  beforeCreator?: MemberSchema
  afterCreator?: MemberSchema
  beforeAssignee?: MemberSchema
  afterAssignee?: MemberSchema
  beforeMilestone?: MilestoneSchema
  afterMilestone?: MilestoneSchema
  beforeProject?: ProjectSchema
  afterProject?: ProjectSchema
}
