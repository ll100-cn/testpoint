import { Issue } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class IssueMigrate extends BaseObjectRequest<Issue> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/migrate"
    this.klass = Issue
  }
}
