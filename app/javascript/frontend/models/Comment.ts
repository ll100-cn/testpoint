import { Type } from "class-transformer"
import { Member } from "./Member"

import { Attachment } from "./Attachment"

export class Comment {
  id : number
  content : string

  @Type(() => Date)
  created_at : Date

  @Type(() => Date)
  updated_at : Date

  @Type(() => Date)
  last_edited_at: Date

  issue_id : number
  collapsed : boolean
  member_id : number
  @Type(() => Member)
  member: Member

  comment_id : number

  @Type(() => Attachment)
  attachments: Attachment[]
}
