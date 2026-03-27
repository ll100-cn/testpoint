import type { EmitsAsProps } from '@/lib/utils'
import { Roadmap } from '@/models'
import type { DefineComponent } from 'vue'

export interface RoadmapFrameProps {
}

export type RoadmapFrameEmits = {
  created: [ Roadmap ]
  updated: [ Roadmap ]
  destroyed: [ Roadmap ]
}

export type RoadmapFrameComponent = DefineComponent<RoadmapFrameProps & EmitsAsProps<RoadmapFrameEmits>>