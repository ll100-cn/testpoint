export interface RequirementSchema {
  id: number
  title: string
  description?: string | null
  sceneId?: number | null
  upstreamIds: number[]
  platformIds: number[]
  labelIds: number[]
  labelDescriptions: unknown
  updatedAt: Date
}
