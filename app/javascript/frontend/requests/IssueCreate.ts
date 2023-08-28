import { Issue } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class IssueCreate extends BaseObjectRequest<Issue> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/projects/{project_id}/issues"
    this.klass = Issue
  }
}
