import { Type } from "class-transformer"
import { Milestone } from "./Milestone"
import { Platform } from "./Platform"
import * as t from '@/lib/transforms'
import { Pagination } from "./Pagination"
import { PhaseInfo } from "./Phase"
import type { OmitByValue } from "utility-types"
import type { PlanSchema } from './schema/plan'

export class Plan implements PlanSchema {
  id!: number
  title!: string

  @Type(() => Date)
  createdAt!: Date
  creatorId!: number
  platformId!: number
  projectId!: number
  creatorName!: string
  milestoneId?: number

  @Type(() => Milestone) milestone: Milestone | null = null
  @Type(() => Platform) platform!: Platform
}

export class PlanBoxImpl {
  @t.Klass(Plan) plan!: Plan

  @t.Klass(PhaseInfo) phaseInfos: PhaseInfo[] = []
}

export type PlanBox = OmitByValue<PlanBoxImpl, Function>

type TasksStateCounts = { [x in "pass" | "failure" | "pending"]: number }
export class PlanPage<Box extends PlanBox> extends Pagination<Box> {
  @t.Klass(PlanBoxImpl) list: Box[] = []
  tasksStateCounts: { [plan_id: string]: TasksStateCounts } = {}
}