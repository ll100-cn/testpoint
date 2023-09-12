import { Type } from "class-transformer"
import { Member } from "./Member"

import dayjs from "@/lib/dayjs"
import { DATE_LONG_FORMAT } from '@/constants'
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

  createOrEditTimeInWords() {
    if (this.last_edited_at) {
      if (dayjs(this.last_edited_at) < dayjs().subtract(10, 'minutes')) {
        return "修改于 " + dayjs(this.last_edited_at, DATE_LONG_FORMAT)
      } else {
        return dayjs(this.last_edited_at).fromNow() + "前修改"
      }
    } else if (dayjs(this.created_at) < dayjs().subtract(10, 'minutes')) {
      return "添加于 " + dayjs(this.created_at, DATE_LONG_FORMAT)
    } else {
      return dayjs(this.created_at).fromNow() + "前添加"
    }
  }
}
