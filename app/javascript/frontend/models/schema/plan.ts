import type { PlatformSchema } from './platform'

export interface PlanSchema {
  id: number
  title: string
  platform: PlatformSchema
  createdAt: Date
  creatorId: number
  platformId: number
  projectId: number
  milestoneId?: number | null
  creatorName: string
}
