import type { EmitsAsProps } from '@/lib/utils'
import type { TaskUpshotBox } from '@/models'
import type { DefineComponent, Component } from 'vue'

export interface TaskUpshotFrameProps {
}

export type TaskUpshotFrameEmits = {
  updated: [ TaskUpshotBox ]
  switch: [ component: Component, ...args: any[] ]
}

export type TaskUpshotFrameComponent = DefineComponent<TaskUpshotFrameProps & EmitsAsProps<TaskUpshotFrameEmits>>