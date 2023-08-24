import { IssueTemplate } from "@/models"
import BaseArrayRequest from "./BaseArrayRequest"

export class IssueTemplateList extends BaseArrayRequest<IssueTemplate> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/issue_templates"
    this.klass = IssueTemplate
  }
}
