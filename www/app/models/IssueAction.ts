import * as t from '@/lib/transforms'
import { Issue } from "./Issue"
import { IssueActivity } from "./IssueActivity"
import type { OmitByValue } from "utility-types"

export class IssueAction {
  @t.Klass(Issue) issue!: Issue
  @t.Klass(IssueActivity) activities: IssueActivity[] = []
}

export class IssueActionBoxImpl extends IssueAction {}

export type IssueActionBox = OmitByValue<IssueActionBoxImpl, Function>

