import * as t from '@/lib/transforms'
import { Attachment } from "./Attachment"
import { Member } from "./Member"

export class Comment {
  @t.Number id : number
  @t.String content : string

  @t.Date created_at : Date
  @t.Date updated_at : Date
  @t.Date last_edited_at: Date

  @t.Number issue_id : number
  @t.Boolean collapsed : boolean
  @t.Number member_id : number
  @t.Klass(Member) member: Member

  @t.Number comment_id : number

  @t.Klass(Attachment) attachments: Attachment[]
}
