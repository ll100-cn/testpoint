import type { EmitsAsProps } from '@/lib/utils'
import { Storyboard } from '@/models'
import type { DefineComponent } from 'vue'

export interface StoryboardFrameProps {
}

export type StoryboardFrameEmits = {
  created: [ Storyboard ]
  updated: [ Storyboard ]
  destroyed: [ Storyboard ]
}

export type StoryboardFrameComponent = DefineComponent<StoryboardFrameProps & EmitsAsProps<StoryboardFrameEmits>>