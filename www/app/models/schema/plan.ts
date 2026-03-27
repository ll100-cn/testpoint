import type { PlatformSchema } from './platform'

export interface PlanSchema {
  id: number
  title: string
  platform: PlatformSchema
  created_at: Date
  creator_id: number
  platform_id: number
  project_id: number
  milestone_id?: number | null
  creator_name: string
}
