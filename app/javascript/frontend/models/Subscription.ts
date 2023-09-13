import { Type } from "class-transformer"

export class Subscription {
  id: number
  user_id: number
  issue_id: number

  @Type(() => Date)
  updated_at: Date
}
