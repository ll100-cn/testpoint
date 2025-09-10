export interface ProfileSchema {
  role: string
  nickname?: string | null
  permissions: Record<string, any>
  memberId: number
  projectId: number
  roleText: string
  projectName: string
}
