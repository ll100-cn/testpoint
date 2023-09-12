import { Type } from "class-transformer"
import { Member } from "./Member"
import { Category } from "./Category"
import { Milestone } from "./Milestone"
import { Task } from "./Task"
import dayjs from "@/lib/dayjs"
import { DATE_LONG_FORMAT } from '@/constants'
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

  @Type(() => Task)
  task: Task

  @Type(() => User)
  subscribed_users: User[]

  titleWithPriority() {
    const prefix = this.priority == "important" ? "!!" : ""
    return `${prefix}${this.title}`
  }

  createOrEditTimeInWords() {
    if (this.last_edited_at) {
      if (dayjs(this.last_edited_at) < dayjs().subtract(10, 'minutes')) {
        return "修改于 " + dayjs(this.last_edited_at, DATE_LONG_FORMAT)
      } else {
        return dayjs(this.last_edited_at).fromNow() + "前修改"
      }
    } else if (dayjs(this.created_at) < dayjs().subtract(10, 'minutes')) {
      return "添加于 " + dayjs(this.created_at, DATE_LONG_FORMAT)
    } else {
      return dayjs(this.created_at).fromNow() + "前添加"
    }
  }
}
