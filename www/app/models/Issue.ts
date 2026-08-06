import { Type } from "class-transformer"
import { Category } from "./Category"
import { Member } from "./Member"
import { Milestone } from "./Milestone"
import { Task } from "./Task"
import type { IssueSchema } from './schema/issue'

export class Issue implements IssueSchema {
  id!: number
  title!: string
  content!: string
  state!: string
  state_text!: string

  stage!: string
  stage_text!: string
  subscribed_users?: unknown[]

  @Type(() => Date)
  created_at!: Date

  @Type(() => Date)
  updated_at!: Date

  project_id!: number
  project_name!: string

  @Type(() => Date)
  last_edited_at?: Date

  creator_id!: number
  assignee_id?: number
  priority!: string
  priority_text!: string
  task_id?: number
  category_id?: number
  @Type(() => Date)
  archived_at?: Date
  milestone_id?: number

  @Type(() => Milestone)
  milestone?: Milestone

  @Type(() => Member)
  creator!: Member

  @Type(() => Member)
  assignee?: Member

  @Type(() => Category)
  category?: Category

  @Type(() => Task)
  task?: Task

  titleWithPriority() {
    const prefix = this.priority == "important" ? "!!" : ""
    return `${prefix}${this.title}`
  }
}

export class IssueSummary {
  by_category: { category: Category, count: number }[] = []
  by_milestone: { milestone: Milestone, count: number }[] = []
  by_assignee: { assignee: Member, count: number }[] = []
  by_creator: { creator: Member, count: number }[] = []
}
