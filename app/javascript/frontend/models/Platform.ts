import { EntityRepo } from "./EntityRepo"
import * as t from '@/lib/transforms'
import { Pagination } from "./Pagination"
import type { OmitByValue } from "utility-types"

export class Platform {
  id!: number
  name!: string
  default_assignee_id: number | null = null
  icon_svg: string | null = null
}

export class PlatformRepo extends EntityRepo<Platform> {
}

export class PlatformBoxImpl {
  @t.Klass(Platform) platform!: Platform
}

export type PlatformBox = OmitByValue<PlatformBoxImpl, Function>

export class PlatformPage<Box extends PlatformBox> extends Pagination<Box> {
  @t.Klass(PlatformBoxImpl) list: Box[] = []
}