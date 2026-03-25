export interface MemberSchema {
  id: number
  name: string
  nickname?: string | null
  role: string
  roleText: string
  receiveMail: boolean
  userId: number
  projectId: number
  archivedAt?: Date | null
  avatarUrl?: string | null
}
