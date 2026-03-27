import type { EmitsAsProps } from '@/lib/utils'
import { TestCase } from '@/models'
import type { DefineComponent } from 'vue'

export interface TestCaseFrameProps {
}

export type TestCaseFrameEmits = {
  created: [ TestCase ]
  updated: [ TestCase ]
  destroyed: [ TestCase ]
}

export type TestCaseFrameComponent = DefineComponent<TestCaseFrameProps & EmitsAsProps<TestCaseFrameEmits>>