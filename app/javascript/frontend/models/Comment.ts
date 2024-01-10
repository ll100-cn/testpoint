import * as t from '@/lib/transforms'
import { Attachment } from "./Attachment"
import { Member } from "./Member"
import { EntityIndex, EntityRepo } from './EntityRepo'

export class Comment {
  @t.Number id : number
  @t.String content : string

  @t.Date created_at : Date
  @t.Date updated_at : Date
  @t.Date last_edited_at: Date

  @t.Number issue_id : number
  @t.Boolean collapsed : boolean
  @t.String display: string
  @t.Number member_id : number
  @t.Klass(Member) member: Member

  @t.Number comment_id : number

  @t.Klass(Attachment) attachments: Attachment[]
}

export class CommentRepo extends EntityRepo<Comment> {
  parent_id = new EntityIndex<number, Comment>(it => it.comment_id)

  override buildIndex(entity: Comment): void {
    this.parent_id.add(entity)
  }
}