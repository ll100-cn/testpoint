import { Type } from "class-transformer"
import { Category, Project } from "."
import type { IssueStateSchema } from './schema/issue_state'

export class IssueStat implements IssueStateSchema {
  projectId!: number
  categoryId?: number | null
  stage!: string
  count!: number

  @Type(() => Category)
  category?: Category
}
