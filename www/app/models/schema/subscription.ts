import type { MemberSchema } from './member'

export interface SubscriptionSchema {
  id: number
  member: MemberSchema
  userId: number
  issueId: number
  updatedAt: Date
}
