export interface MilestoneSchema {
  id: number
  title: string
  description?: string | null
  published_at?: Date | null
  archived_at?: Date | null
  project_id: number
}
