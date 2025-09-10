import * as t from '@/lib/transforms'
import { Attachment } from "./Attachment"
import { Member } from "./Member"
import { EntityIndex, EntityRepo } from './EntityRepo'
import { Pagination } from './Pagination'
import type { OmitByValue } from "utility-types"
import type { CommentSchema } from './schema/comment'

export class Comment implements CommentSchema {
  @t.Number id!: number
  @t.String content!: string

  @t.Date createdAt!: Date
  @t.Date updatedAt!: Date
  @t.Date lastEditedAt: Date | null = null

  @t.Number issueId!: number
  @t.Boolean collapsed!: boolean
  @t.String display!: string
  @t.Number memberId!: number
  @t.Klass(Member) member!: Member

  @t.Number commentId: number | null = null

  @t.Klass(Attachment) attachments: Attachment[] = []
}

export class CommentRepo extends EntityRepo<Comment> {
  parent_id = new EntityIndex<number | null, Comment>(it => it.commentId)

  override buildIndex(entity: Comment): void {
    this.parent_id.add(entity)
  }
}

export class CommentBoxImpl {
  @t.Klass(Comment) comment!: Comment

  static from(comment: Comment): CommentBoxImpl {
    return { comment }
  }
}

export type CommentBox = OmitByValue<CommentBoxImpl, Function>

export class CommentPage<Box extends CommentBox> extends Pagination<Box> {
  @t.Klass(CommentBoxImpl) list: Box[] = []
}
