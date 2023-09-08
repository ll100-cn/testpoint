import { Type } from "class-transformer"

export class Task {
  id: number
  plan_id: number
  state: string
  finished: boolean
  phase_id: number
  test_case_id: number

  @Type(() => Date)
  ignore_at: Date | null
}
