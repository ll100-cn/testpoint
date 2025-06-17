import * as t from '@/lib/transforms'
import { Pagination } from './Pagination'
import type { OmitByValue } from "utility-types"

export class Project {
  id!: number
  name: string | null = null
  archived!: boolean

  trello_list_id: string | null = null
  trello_api_key: string | null = null
  trello_api_token: string | null = null
  webhook_url: string | null = null
}

export class ProjectBoxImpl {
  @t.Klass(Project) project!: Project
}

export type ProjectBox = OmitByValue<ProjectBoxImpl, Function>

export class ProjectPage<Box extends ProjectBox> extends Pagination<Box> {
  @t.Klass(ProjectBoxImpl) list: Box[] = []
}