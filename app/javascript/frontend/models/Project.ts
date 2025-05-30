import * as t from '@/lib/transforms'
import { Pagination } from './Pagination'

export class Project {
  id!: number
  name: string | null = null
  archived!: boolean

  trello_list_id: string | null = null
  trello_api_key: string | null = null
  trello_api_token: string | null = null
  webhook_url: string | null = null
}

export class ProjectBox {
  @t.Klass(Project) project!: Project
}

export class ProjectPage<Box extends ProjectBox> extends Pagination<Box> {
  @t.Klass(ProjectBox) list: Box[] = []
}