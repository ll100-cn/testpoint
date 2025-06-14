import { EntityRepo } from "./EntityRepo"
import * as t from '@/lib/transforms'
import { Pagination } from "./Pagination"

export class TestCaseLabel {
  id!: number
  name!: string
  description: string | null = null
}

export class LabelRepo extends EntityRepo<TestCaseLabel> {
}

export class TestCaseLabelBox {
  @t.Klass(TestCaseLabel) test_case_label!: TestCaseLabel
  test_case_count: number | null = null
}

export class TestCaseLablePage<Box extends TestCaseLabelBox> extends Pagination<Box> {
  @t.Klass(TestCaseLabelBox) list: Box[] = []
}