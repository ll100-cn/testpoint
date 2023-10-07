import * as t from '@/lib/transforms'

export enum Role {
  reporter,
  developer,
  manager,
  owner,
}

export class Member {
  id: number
  name: string
  nickname: string | null
  role: keyof typeof Role
  role_text: string
  receive_mail: boolean
  user_id: number
  project_id: number
  avatar_url: string

  @t.Date archived_at: Date | null
}
