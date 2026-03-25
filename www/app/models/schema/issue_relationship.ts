import type { MemberSchema } from './member'
import type { IssueSchema } from './issue'

export interface IssueRelationshipSchema {
  id: number
  category?: string | null
  member?: MemberSchema
  target?: IssueSchema
  source?: IssueSchema
  targetId: number
  sourceId: number
  memberId: number
  createdAt: Date
  updatedAt: Date
}
