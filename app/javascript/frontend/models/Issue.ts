import { Type } from "class-transformer"
import { Member } from "./Member"
import { Category } from "./Category"
import { Milestone } from "./Milestone"

export class Issue {
  id: number
  title: string
  content: string
  state: string
  state_text: string
  created_at: string
  updated_at: string
  project_id: number
  last_edited_at: string
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
}
