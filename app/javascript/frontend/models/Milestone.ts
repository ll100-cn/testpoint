import { Type } from "class-transformer"
import * as t from '@/lib/transforms'
import { Pagination } from "./Pagination"
import type { OmitByValue } from "utility-types"

export class Milestone {
  id!: number
  project_id!: number
  title!: string
  description?: string
  platform_ids: number[] = []

  @Type(() => Date)
  published_at?: Date
  @Type(() => Date)
  archived_at?: Date

  isPublished(): boolean {
    if (this.published_at == null) {
      return false
    }

    const now = new Date()
    return this.published_at <= now
  }

  isArchived(): boolean {
    return this.archived_at !== null
  }
}

export class MilestoneBoxImpl {
  @t.Klass(Milestone) milestone!: Milestone
}

export type MilestoneBox = OmitByValue<MilestoneBoxImpl, Function>

export class MilestonePage<Box extends MilestoneBox> extends Pagination<Box> {
  @t.Klass(MilestoneBoxImpl) list: Box[] = []
}