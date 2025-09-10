import { EntityRepo } from "./EntityRepo"
import * as t from '@/lib/transforms'
import { Pagination } from "./Pagination"
import type { OmitByValue } from "utility-types"
import type { PlatformSchema } from './schema/platform'

export class Platform implements PlatformSchema {
  id!: number
  name!: string
  defaultAssigneeId: number | null = null
  iconSvg: string | null = null
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