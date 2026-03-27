export interface ProfileSchema {
  role: string
  nickname?: string | null
  permissions: Record<string, any>
  member_id: number
  project_id: number
  role_text: string
  project_name: string
}
