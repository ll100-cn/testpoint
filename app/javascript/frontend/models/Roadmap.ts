import { Type } from "class-transformer"
import * as t from '@/lib/transforms'
import { EntityRepo } from "./EntityRepo"
import { Pagination } from "./Pagination"

export class Roadmap {
  id!: number
  title!: string
  @t.Date created_at!: Date
  @t.Date updated_at!: Date
}

export class RoadmapBox {
  @t.Klass(Roadmap) roadmap!: Roadmap
}

export class RoadmapPage<Box extends RoadmapBox> extends Pagination<Box> {
  @t.Klass(RoadmapBox) list: Box[] = []
}

export class RoadmapRepo extends EntityRepo<Roadmap> {
}

