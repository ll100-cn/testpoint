import { Type } from "class-transformer"
import { Milestone } from "./Milestone"
import { Platform } from "./Platform"
import * as t from '@/lib/transforms'
import { Pagination } from "./Pagination"
import { PhaseInfo } from "./Phase"

export class Plan {
  id!: number
  title!: string

  @Type(() => Date)
  created_at!: Date
  creator_id!: number
  platform_id!: number
  project_id!: number
  creator_name!: string

  @Type(() => Milestone) milestone: Milestone | null = null
  @Type(() => Platform) platform!: Platform
}

export class PlanBox {
  @t.Klass(Plan) plan!: Plan
  tasks_state_counts: { [x in "pass" | "failure" | "pending"]: number } | null = null
  @t.Klass(PhaseInfo) phase_infos: PhaseInfo[] = []
}

export class PlanPage<Box extends PlanBox> extends Pagination<Box> {
  @t.Klass(Plan) list: Box[] = []
}