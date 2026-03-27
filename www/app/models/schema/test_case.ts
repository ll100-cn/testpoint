export interface TestCaseSchema {
  id: number
  title: string
  content?: string | null
  archived: boolean
  scene_name?: string | null
  role_name?: string | null
  group_name?: string | null
  project_id: number
  platform_ids: number[]
  label_ids: number[]
  scene_path?: string | unknown[] | null
  updated_at: Date
  requirement_id?: number | null
  roadmap_id?: number | null
}
