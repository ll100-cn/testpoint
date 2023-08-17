import { Type } from "class-transformer"
import { Milestone } from "./Milestone"
import { Platform } from "./Platform"

export class Plan {
  id: number
  title: string

  @Type(() => Date)
  created_at: Date
  creator_id: number
  platform_id: number
  project_id: number
  creator_name: string

  tasks_state_counts: { [x in "pass" | "failure" | "pending"]: number }

  @Type(() => Milestone)
  milestone: Milestone

  @Type(() => Platform)
  platform: Platform
}
