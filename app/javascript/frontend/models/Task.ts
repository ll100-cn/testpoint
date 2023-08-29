import { Type } from "class-transformer"

export class Task {
  id: number
  plan_id: number
  state: string
  finished: boolean

  @Type(() => Date)
  ignore_at: Date | null
}
