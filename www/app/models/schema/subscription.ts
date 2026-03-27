import type { MemberSchema } from './member'

export interface SubscriptionSchema {
  id: number
  member: MemberSchema
  user_id: number
  issue_id: number
  updated_at: Date
}
