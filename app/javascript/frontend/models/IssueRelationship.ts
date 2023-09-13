import { Type } from "class-transformer"
import { Member } from "./Member"
import { Issue } from "./Issue"

export class IssueRelationship {
  id: number
  target_id: number
  source_id: number
  member_id: number
  category: string

  @Type(() => Issue)
  target: Issue

  @Type(() => Issue)
  source: Issue

  @Type(() => Member)
  member: Member

  @Type(() => Date)
  created_at: Date

  @Type(() => Date)
  updated_at: Date
}
