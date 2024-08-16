import { Type } from "class-transformer"
import * as t from '@/lib/transforms'
import { EntityRepo } from "./EntityRepo"

export class Roadmap {
  id!: number
  title!: string
  @t.Date created_at!: Date
  @t.Date updated_at!: Date
}

export class RoadmapRepo extends EntityRepo<Roadmap> {
}