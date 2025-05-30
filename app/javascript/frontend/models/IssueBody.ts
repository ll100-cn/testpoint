import * as t from "@/lib/transforms"
import { Attachment } from "./Attachment"
import { Issue } from "./Issue"

export class IssueBodyBox {
  @t.Klass(Issue) issue!: Issue
  @t.Klass(Attachment) attachments: Attachment[] = []
}
