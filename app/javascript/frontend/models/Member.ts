import * as t from '@/lib/transforms'

export class Member {
  id: number
  name: string
  nickname: string | null
  role: string
  role_text: string
  receive_mail: boolean
  user_id: number
  project_id: number
  avatar_url: string

  @t.Date archived_at: Date | null
}
