import type { EmitsAsProps } from '@/lib/utils'
import type { CommentBox, IssueBox } from '@/models'
import type { DefineComponent } from 'vue'

export interface IssueStateFrameProps {
}

export type IssueStateFrameEmits = {
  created: [ IssueBox, CommentBox ]
}

export type IssueStateFrameComponent = DefineComponent<IssueStateFrameProps & EmitsAsProps<IssueStateFrameEmits>>