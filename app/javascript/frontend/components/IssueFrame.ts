import type { EmitsAsProps } from '@/lib/utils'
import type { IssueBox } from '@/models'
import type { DefineComponent } from 'vue'

export interface IssueFrameProps {
}

export type IssueFrameEmits = {
  created: [ IssueBox ]
  updated: [ IssueBox ]
  destroyed: [ IssueBox ]
}

export type IssueFrameComponent = DefineComponent<IssueFrameProps & EmitsAsProps<IssueFrameEmits>>