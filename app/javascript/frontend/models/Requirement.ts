import { Type } from "class-transformer"
import * as t from '@/lib/transforms'
import { EntityIndex, EntityRepo } from "./EntityRepo"

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

export class RequirementRepo extends EntityRepo<Requirement> {
  scene_id = new EntityIndex<number | null, Requirement>(it => it.scene_id)

  buildIndex(entity: Requirement): void {
    this.scene_id.add(entity);
  }
}