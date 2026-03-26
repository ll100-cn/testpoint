import type { EmitsAsProps } from '@/lib/utils'
import type { CommentBox } from '@/models'
import type { DefineComponent } from 'vue'

export interface IssueCommentFrameProps {
}

export type IssueCommentFrameEmits = {
  created: [ CommentBox ]
  updated: [ CommentBox ]
  destroyed: [ CommentBox ]
  changed: [ CommentBox ]
}

export type IssueCommentFrameComponent = DefineComponent<IssueCommentFrameProps & EmitsAsProps<IssueCommentFrameEmits>>
