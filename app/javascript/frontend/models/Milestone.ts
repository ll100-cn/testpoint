import { Type } from "class-transformer"
import * as t from '@/lib/transforms'
import { Pagination } from "./Pagination"
import type { OmitByValue } from "utility-types"
import type { MilestoneSchema } from './schema/milestone'

export class Milestone implements MilestoneSchema {
  id!: number
  projectId!: number
  title!: string
  description?: string
  platformIds: number[] = []

  @Type(() => Date)
  publishedAt?: Date
  @Type(() => Date)
  archivedAt?: Date

  isPublished(): boolean {
    if (this.publishedAt == null) {
      return false
    }

    const now = new Date()
    return this.publishedAt <= now
  }

  isArchived(): boolean {
    return this.archivedAt !== null
  }
}

export class MilestoneBoxImpl {
  @t.Klass(Milestone) milestone!: Milestone
}

export type MilestoneBox = OmitByValue<MilestoneBoxImpl, Function>

export class MilestonePage<Box extends MilestoneBox> extends Pagination<Box> {
  @t.Klass(MilestoneBoxImpl) list: Box[] = []
}