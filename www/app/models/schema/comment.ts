import type { MemberSchema } from './member'
import type { AttachmentSchema } from './attachment'

export interface CommentSchema {
  id: number
  content: string
  collapsed: boolean
  display: boolean | string | null
  member?: MemberSchema
  attachments?: AttachmentSchema[]
  created_at: Date
  updated_at: Date
  issue_id: number
  last_edited_at?: Date | null
  member_id: number
  comment_id?: number | null
}
