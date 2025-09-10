import type { MemberSchema } from './member'
import type { AttachmentSchema } from './attachment'

export interface CommentSchema {
  id: number
  content: string
  collapsed: boolean
  display: boolean | string | null
  member?: MemberSchema
  attachments?: AttachmentSchema[]
  createdAt: Date
  updatedAt: Date
  issueId: number
  lastEditedAt?: Date | null
  memberId: number
  commentId?: number | null
}
