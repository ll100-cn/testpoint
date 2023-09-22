import { Type } from "class-transformer"
import { Category, Project } from "."

export class IssueStat {
  project_id: number
  category_id: number
  stage: "pending" | "developing" | "testing" | "deploying" | "resolved" | "closed"
  count: number

  @Type(() => Category)
  category?: Category
}
