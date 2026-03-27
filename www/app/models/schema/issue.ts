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
  state_text: string
  created_at: Date
  updated_at: Date
  project_id: number
  last_edited_at?: Date | null
  creator_id: number
  assignee_id?: number | null
  priority_text: string
  task_id?: number | null
  category_id?: number | null
  archived_at?: Date | null
  milestone_id?: number | null
  subscribed_users?: unknown[] | null
  stage_text: string
  project_name: string
}
