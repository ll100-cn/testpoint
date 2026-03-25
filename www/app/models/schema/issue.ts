import type { MemberSchema } from './member'
import type { TaskSchema } from './task'
import type { MilestoneSchema } from './milestone'
import type { CategorySchema } from './category'

export interface IssueSchema {
  id: number
  title: string
  content?: string | null
  state: string
  priority: string
  stage: string
  creator: MemberSchema
  task?: TaskSchema
  milestone?: MilestoneSchema
  assignee?: MemberSchema
  category?: CategorySchema
  stateText: string
  createdAt: Date
  updatedAt: Date
  projectId: number
  lastEditedAt?: Date | null
  creatorId: number
  assigneeId?: number | null
  priorityText: string
  taskId?: number | null
  categoryId?: number | null
  archivedAt?: Date | null
  milestoneId?: number | null
  subscribedUsers?: unknown[] | null
  stageText: string
  projectName: string
}
