import * as t from '@/lib/transforms'
import { EntityIndex, EntityRepo } from "./EntityRepo"
import { Pagination } from "./Pagination"
import { RequirementStat } from './RequirementStat'

export class Requirement {
  id!: number
  scene_id: number | null = null

  platform_ids: number[] = []
  upstream_ids: number[] = []
  label_ids: number[] = []
  label_descriptions: Record<string, string> = {}

  title!: string
  description?: string
  roles: string[] = []

  @t.Date updated_at!: Date
}

export class RequirementBox {
  @t.Klass(Requirement) requirement!: Requirement
}

export class RequirementPage<Box extends RequirementBox> extends Pagination<Box> {
  @t.Klass(RequirementBox) list: Box[] = []
  @t.Klass(RequirementStat) requirement_stats: RequirementStat[] = []
}

export class RequirementRepo extends EntityRepo<Requirement> {
  scene_id = new EntityIndex<number | null, Requirement>(it => it.scene_id)

  buildIndex(entity: Requirement): void {
    this.scene_id.add(entity);
  }
}