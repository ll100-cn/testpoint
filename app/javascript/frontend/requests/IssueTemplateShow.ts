import { IssueTemplate } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class IssueTemplateShow extends BaseObjectRequest<IssueTemplate> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/issue_templates/{issue_template_id}"
    this.klass = IssueTemplate
  }
}
