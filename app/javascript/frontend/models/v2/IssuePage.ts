import { Type } from "class-transformer"
import { IssueBox } from "./IssueBox"
import { Pagination } from "./Pagination"
import { IssueStat } from "./IssueStat"

export class IssuePage extends Pagination<IssueBox> {
  @Type(() => IssueStat) issue_stats!: IssueStat[]
}
