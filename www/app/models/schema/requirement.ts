export interface RequirementSchema {
  id: number
  title: string
  description?: string | null
  scene_id?: number | null
  upstream_ids: number[]
  platform_ids: number[]
  label_ids: number[]
  label_descriptions: Record<string, string>
  updated_at: Date
}
