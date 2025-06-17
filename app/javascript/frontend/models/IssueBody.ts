import * as t from "@/lib/transforms"
import { Attachment } from "./Attachment"
import { Issue } from "./Issue"
import type { OmitByValue } from "utility-types"

export class IssueBodyBoxImpl {
  @t.Klass(Issue) issue!: Issue
  @t.Klass(Attachment) attachments: Attachment[] = []
}

export type IssueBodyBox = OmitByValue<IssueBodyBoxImpl, Function>
