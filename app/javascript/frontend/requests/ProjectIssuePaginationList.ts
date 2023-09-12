import { Issue } from "@/models"
import BasePaginationRequest from "./BasePaginationRequest"

export class ProjectIssuePaginationList extends BasePaginationRequest<Issue> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/issues"
    this.klass = Issue
  }
}
