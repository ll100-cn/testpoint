import type { EmitsAsProps } from '@/lib/utils'
import { Plan } from '@/models'
import type { DefineComponent } from 'vue'

export interface PlanFrameProps {
}

export type PlanFrameEmits = {
  created: [ Plan ]
  updated: [ Plan ]
  destroyed: [ Plan ]
}

export type PlanFrameComponent = DefineComponent<PlanFrameProps & EmitsAsProps<PlanFrameEmits>>