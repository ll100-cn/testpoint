import { Type } from "class-transformer"
import * as t from '@/lib/transforms'
import { EntityRepo } from "./EntityRepo"
import { Pagination } from "./Pagination"
import type { OmitByValue } from "utility-types"
import type { RoadmapSchema } from './schema/roadmap'

export class Roadmap implements RoadmapSchema {
  id!: number
  title!: string
  @t.Date createdAt!: Date
  @t.Date updatedAt!: Date
}

export class RoadmapBoxImpl {
  @t.Klass(Roadmap) roadmap!: Roadmap
}

export type RoadmapBox = OmitByValue<RoadmapBoxImpl, Function>

export class RoadmapPage<Box extends RoadmapBox> extends Pagination<Box> {
  @t.Klass(RoadmapBoxImpl) list: Box[] = []
}

export class RoadmapRepo extends EntityRepo<Roadmap> {
}

