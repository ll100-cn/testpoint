import { EntityRepo } from "./EntityRepo"
import * as t from '@/lib/transforms'
import { Pagination } from "./Pagination"
import type { OmitByValue } from "utility-types"

export class TestCaseLabel {
  id!: number
  name!: string
  description: string | null = null
}

export class LabelRepo extends EntityRepo<TestCaseLabel> {
}

export class TestCaseLabelBoxImpl {
  @t.Klass(TestCaseLabel) test_case_label!: TestCaseLabel
}

export type TestCaseLabelBox = OmitByValue<TestCaseLabelBoxImpl, Function>

export class TestCaseLablePage<Box extends TestCaseLabelBox> extends Pagination<Box> {
  @t.Klass(TestCaseLabelBoxImpl) list: Box[] = []
  cases_counts: Record<string, number> = {}
}