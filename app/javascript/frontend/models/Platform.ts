import { EntityRepo } from "./EntityRepo"

export class Platform {
  id: number
  name: string
  default_assignee_id: number
}

export class PlatformRepo extends EntityRepo<Platform> {
}