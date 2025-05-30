import * as t from '@/lib/transforms'
import { Attachment } from "./Attachment"
import { Member } from "./Member"
import { EntityIndex, EntityRepo } from './EntityRepo'
import { Pagination } from './Pagination'

export class Comment {
  @t.Number id!: number
  @t.String content!: string

  @t.Date created_at!: Date
  @t.Date updated_at!: Date
  @t.Date last_edited_at: Date | null = null

  @t.Number issue_id!: number
  @t.Boolean collapsed!: boolean
  @t.String display!: string
  @t.Number member_id!: number
  @t.Klass(Member) member!: Member

  @t.Number comment_id: number | null = null

  @t.Klass(Attachment) attachments: Attachment[] = []
}

export class CommentRepo extends EntityRepo<Comment> {
  parent_id = new EntityIndex<number | null, Comment>(it => it.comment_id)

  override buildIndex(entity: Comment): void {
    this.parent_id.add(entity)
  }
}

export class CommentBox {
  @t.Klass(Comment) comment!: Comment

  static from(comment: Comment): CommentBox {
    return { comment }
  }
}

export class CommentPage<Box extends CommentBox> extends Pagination<Box> {
  @t.Klass(CommentBox) list: Box[] = []
}
