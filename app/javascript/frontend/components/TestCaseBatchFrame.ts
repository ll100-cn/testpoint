import type { EmitsAsProps } from '@/lib/utils'
import type { DefineComponent } from 'vue'

export interface TestCaseBatchFrameProps {
}

export type TestCaseBatchFrameEmits = {
  updated: []
}

export type TestCaseBatchFrameComponent = DefineComponent<TestCaseBatchFrameProps & EmitsAsProps<TestCaseBatchFrameEmits>>