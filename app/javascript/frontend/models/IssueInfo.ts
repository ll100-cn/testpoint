import { Type } from "class-transformer"

export class IssueInfo {
  id: number
  issue_id: number
  template_id: number
  state: string
  values: Record<number, string>

  @Type(() => Date)
  created_at: Date

  @Type(() => Date)
  updated_at: Date

  remark: string
}
