import { Type } from "class-transformer"
import * as t from '@/lib/transforms'
import { EntityRepo } from "./EntityRepo"

export class Requirement {
  id!: number

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
}