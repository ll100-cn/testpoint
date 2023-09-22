import * as t from '@/lib/transforms'
import { Issue } from "./Issue"
import { IssueActivity } from "./IssueActivity"

export class IssueAction {
  @t.Klass(Issue) issue: Issue
  @t.Klass(IssueActivity) activities: IssueActivity[]
}
