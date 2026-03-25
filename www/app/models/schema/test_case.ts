export interface TestCaseSchema {
  id: number
  title: string
  content?: string | null
  archived: boolean
  sceneName?: string | null
  roleName?: string | null
  groupName?: string | null
  projectId: number
  platformIds: number[]
  labelIds: number[]
  scenePath?: string | unknown[] | null
  updatedAt: Date
  requirementId?: number | null
  roadmapId?: number | null
}
