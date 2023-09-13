import { Issue } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class IssueGet extends BaseObjectRequest<Issue> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}"
    this.klass = Issue
  }
}
