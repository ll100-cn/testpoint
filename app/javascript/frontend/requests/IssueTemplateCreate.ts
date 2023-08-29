import { IssueTemplate } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class IssueTemplateCreate extends BaseObjectRequest<IssueTemplate> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/projects/{project_id}/issue_templates"
    this.klass = IssueTemplate
  }
}
