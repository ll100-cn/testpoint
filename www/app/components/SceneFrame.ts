import type { EmitsAsProps } from '@/lib/utils'
import { Scene } from '@/models'
import type { DefineComponent, Component } from 'vue'

export interface SceneFrameProps {
}

export type SceneFrameEmits = {
  created: [ Scene ]
  updated: [ Scene ]
  destroyed: [ Scene ]
  switch: [Component, ...any]
}

export type SceneFrameComponent = DefineComponent<SceneFrameProps & EmitsAsProps<SceneFrameEmits>>