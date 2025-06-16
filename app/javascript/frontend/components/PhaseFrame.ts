import type { EmitsAsProps } from '@/lib/utils'
import { Phase } from '@/models'
import type { DefineComponent } from 'vue'

export interface PhaseFrameProps {
}

export type PhaseFrameEmits = {
  created: [ Phase ]
  updated: [ Phase ]
  destroyed: [ Phase ]
}

export type PhaseFrameComponent = DefineComponent<PhaseFrameProps & EmitsAsProps<PhaseFrameEmits>>