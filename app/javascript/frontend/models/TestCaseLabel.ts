import { EntityRepo } from "./EntityRepo"
import * as t from '@/lib/transforms'
import { Pagination } from "./Pagination"
import type { OmitByValue } from "utility-types"
import type { TestCaseLabelSchema } from './schema/test_case_label'

export class TestCaseLabel implements TestCaseLabelSchema {
  id!: number
  name!: string
  description: string | null = null
}

export class LabelRepo extends EntityRepo<TestCaseLabel> {
}

export class TestCaseLabelBoxImpl {
  @t.Klass(TestCaseLabel) testCaseLabel!: TestCaseLabel
}

export type TestCaseLabelBox = OmitByValue<TestCaseLabelBoxImpl, Function>

export class TestCaseLablePage<Box extends TestCaseLabelBox> extends Pagination<Box> {
  @t.Klass(TestCaseLabelBoxImpl) list: Box[] = []
  casesCounts: Record<string, number> = {}
}