import { IssueSummary } from "@/models"
import BaseObjectRequest from "../BaseObjectRequest"

export default {
  Get: class extends BaseObjectRequest<IssueSummary> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/issue_summaries"
      this.klass = IssueSummary
    }
  }
}
