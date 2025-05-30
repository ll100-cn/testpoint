import { Type } from "class-transformer"

export class Issue {
  id!: number
  title!: string
  content!: string
  state!: string
  stage!: string

  @Type(() => Date) created_at!: Date
  @Type(() => Date) updated_at!: Date
  @Type(() => Date) last_edited_at?: Date

  priority?: string
  task_id?: number
  category_id?: number

  titleWithPriority() {
    const prefix = this.priority == "important" ? "!!" : ""
    return `${prefix}${this.title}`
  }
}
