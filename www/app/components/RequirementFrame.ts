import type { EmitsAsProps } from '@/lib/utils'
import { Requirement } from '@/models'
import type { DefineComponent } from 'vue'

export interface RequirementFrameProps {
}

export type RequirementFrameEmits = {
  created: [ Requirement ]
  updated: [ Requirement ]
  destroyed: [ Requirement ]
}

export type RequirementFrameComponent = DefineComponent<RequirementFrameProps & EmitsAsProps<RequirementFrameEmits>>