import { EntityRepo } from "./EntityRepo"

export class TestCaseLabel {
  id!: number
  name!: string
  description?: string
}

export class LabelRepo extends EntityRepo<TestCaseLabel> {
}