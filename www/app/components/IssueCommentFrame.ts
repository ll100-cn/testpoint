import type { EmitsAsProps } from '@/lib/utils'
import type { Comment, CommentBox } from '@/models'
import type { DefineComponent } from 'vue'

export interface IssueCommentFrameProps {
}

export type IssueCommentFrameEmits = {
  created: [ CommentBox ]
  updated: [ CommentBox ]
  destroyed: [ CommentBox ]
}

export type IssueCommentFrameComponent = DefineComponent<IssueCommentFrameProps & EmitsAsProps<IssueCommentFrameEmits>>