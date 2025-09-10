import { Type } from "class-transformer"
import * as t from '@/lib/transforms'
import { Pagination } from './Pagination'
import type { OmitByValue } from "utility-types"
import type { TestCaseSchema } from './schema/test_case'

export class TestCase implements TestCaseSchema {
  id!: number
  projectId!: number
  title!: string
  content!: string
  platformIds: number[] = []
  labelIds: number[] = []
  roleName: string | null = null
  sceneName: string | null = null
  groupName: string | null = null
  scenePath?: string[]
  archived!: boolean

  storyboardId: number | null = null
  requirementId: number | null = null
  roadmapId: number | null = null

  @Type(() => Date) updatedAt!: Date
}

export class TestCaseBoxImpl {
  @t.Klass(TestCase) testCase!: TestCase
}

export type TestCaseBox = OmitByValue<TestCaseBoxImpl, Function>

export class TestCasePage<Box extends TestCaseBox> extends Pagination<Box> {
  @t.Klass(TestCaseBoxImpl) list: Box[] = []
}
