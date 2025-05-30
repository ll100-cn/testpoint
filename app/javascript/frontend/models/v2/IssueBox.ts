import { Type } from "class-transformer"
import { Issue } from "./Issue"

export class IssueBox {
  @Type(() => Issue) issue!: Issue
}
