import { Type } from "class-transformer"

export class IssueStat {
  project_id!: number
  category_id: number | null = null
  stage!: "pending" | "developing" | "deploying" | "resolved" | "closed"
  count!: number
}
