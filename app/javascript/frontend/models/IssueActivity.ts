import { Type } from "class-transformer"
import { Member } from "./Member"

export class IssueActivity {
  id: number
  issue_id: number
  member_id: number
  property: string
  after_value: string
  before_value: string

  @Type(() => Member)
  member: Member

  @Type(() => Date)
  created_at: Date

  @Type(() => Date)
  updated_at: Date
}
