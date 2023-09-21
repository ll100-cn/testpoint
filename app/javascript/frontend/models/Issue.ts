import { Type } from "class-transformer"
import { Category } from "./Category"
import { Member } from "./Member"
import { Milestone } from "./Milestone"
import { Task } from "./Task"
import { User } from "./User"

export class Issue {
  id: number
  title: string
  content: string
  state: string
  state_text: string

  @Type(() => Date)
  created_at: Date

  @Type(() => Date)
  updated_at: Date

  project_id: number

  @Type(() => Date)
  last_edited_at: Date

  creator_id: number
  assignee_id: number
  priority: string
  priority_text: string
  task_id: number
  category_id: number
  archived_at: string
  milestone_id: number

  @Type(() => Milestone)
  milestone: Milestone

  @Type(() => Member)
  creator: Member

  @Type(() => Member)
  assignee: Member

  @Type(() => Category)
  category: Category

  @Type(() => Task)
  task: Task

  titleWithPriority() {
    const prefix = this.priority == "important" ? "!!" : ""
    return `${prefix}${this.title}`
  }
}
