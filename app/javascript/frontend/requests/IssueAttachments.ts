import { Attachment } from "@/models"
import BaseArrayRequest from "./BaseArrayRequest"

export class IssueAttachments extends BaseArrayRequest<Attachment> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/attachments"
    this.klass = Attachment
  }
}
