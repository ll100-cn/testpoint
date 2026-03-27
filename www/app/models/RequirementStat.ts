import { EntityRepo } from "./EntityRepo"

export class RequirementStat {
  id!: number
  test_cases_count!: number
}

export class RequirementStatRepo extends EntityRepo<RequirementStat> {
}