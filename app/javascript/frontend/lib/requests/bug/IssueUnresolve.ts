import { Issue } from "@/models"
import BaseObjectRequest from "../BaseObjectRequest"

export default class extends BaseObjectRequest<Issue> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/unresolve"
    this.klass = Issue
  }
}
