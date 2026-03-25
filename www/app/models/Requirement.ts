import * as t from '@/lib/transforms'
import { EntityIndex, EntityRepo } from "./EntityRepo"
import { Pagination } from "./Pagination"
import { RequirementStat } from './RequirementStat'
import type { OmitByValue } from "utility-types"
import type { RequirementSchema } from './schema/requirement'

export class Requirement implements RequirementSchema {
  id!: number
  sceneId: number | null = null

  platformIds: number[] = []
  upstreamIds: number[] = []
  labelIds: number[] = []
  labelDescriptions: Record<string, string> = {}

  title!: string
  description?: string
  roles: string[] = []

  @t.Date updatedAt!: Date
}

export class RequirementBoxImpl {
  @t.Klass(Requirement) requirement!: Requirement
}

export type RequirementBox = OmitByValue<RequirementBoxImpl, Function>

export class RequirementPage<Box extends RequirementBox> extends Pagination<Box> {
  @t.Klass(RequirementBoxImpl) list: Box[] = []
  @t.Klass(RequirementStat) requirementStats: RequirementStat[] = []
}

export class RequirementRepo extends EntityRepo<Requirement> {
  sceneId = new EntityIndex<number | null, Requirement>(it => it.sceneId)

  buildIndex(entity: Requirement): void {
    this.sceneId.add(entity);
  }
}