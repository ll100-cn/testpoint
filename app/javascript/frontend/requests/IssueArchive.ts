import { Issue } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class IssueArchive extends BaseObjectRequest<Issue> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/archive"
    this.klass = Issue
  }
}
