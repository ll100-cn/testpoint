import * as t from '@/lib/transforms'
import { Pagination } from './Pagination'
import type { OmitByValue } from "utility-types"
import type { ProjectSchema } from './schema/project'

export class Project implements ProjectSchema {
  id!: number
  name?: string
  archived?: boolean

  trelloListId: string | null = null
  trelloApiKey: string | null = null
  trelloApiToken: string | null = null
  webhookUrl: string | null = null
}

export class ProjectBoxImpl {
  @t.Klass(Project) project!: Project
}

export type ProjectBox = OmitByValue<ProjectBoxImpl, Function>

export class ProjectPage<Box extends ProjectBox> extends Pagination<Box> {
  @t.Klass(ProjectBoxImpl) list: Box[] = []
}