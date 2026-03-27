export interface MemberSchema {
  id: number
  name: string
  nickname?: string | null
  role: string
  role_text: string
  receive_mail: boolean
  user_id: number
  project_id: number
  archived_at?: Date | null
  avatar_url?: string | null
}
