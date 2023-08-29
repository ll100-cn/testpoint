import { IssueTemplate } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class IssueTemplateDestroy extends BaseObjectRequest<IssueTemplate> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/projects/{project_id}/issue_templates/{issue_template_id}"
    this.klass = IssueTemplate
  }
}
