import { Type } from "class-transformer"

export class Requirement {
  id!: number

  platform_ids: number[] = []
  upstream_ids: number[] = []

  title!: string
  description?: string
  roles: string[] = []
}