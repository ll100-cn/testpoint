export interface MilestoneSchema {
  id: number
  title: string
  description?: string | null
  publishedAt?: Date | null
  archivedAt?: Date | null
  projectId: number
}
