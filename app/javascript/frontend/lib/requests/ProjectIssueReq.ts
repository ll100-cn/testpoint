import { Issue } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"
import BasePaginationRequest from "./BasePaginationRequest"

export default {
  Page: class extends BasePaginationRequest<Issue> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/issues"
      this.klass = Issue
    }
  }
}