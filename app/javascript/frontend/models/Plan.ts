import { Type } from "class-transformer"
import { Milestone } from "./Milestone"
import { Platform } from "./Platform"
import * as t from '@/lib/transforms'
import { Pagination } from "./Pagination"
import { PhaseInfo } from "./Phase"
import type { OmitByValue } from "utility-types"

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

export class PlanBoxImpl {
  @t.Klass(Plan) plan!: Plan

  @t.Klass(PhaseInfo) phase_infos: PhaseInfo[] = []
}

export type PlanBox = OmitByValue<PlanBoxImpl, Function>

type TasksStateCounts = { [x in "pass" | "failure" | "pending"]: number }
export class PlanPage<Box extends PlanBox> extends Pagination<Box> {
  @t.Klass(PlanBoxImpl) list: Box[] = []
  tasks_state_counts: { [plan_id: string]: TasksStateCounts } = {}
}