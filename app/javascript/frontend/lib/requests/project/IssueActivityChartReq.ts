import { IssueActivityChart } from "@/models"
import { BaseObjectRequest } from ".."

export default {
  Get: class extends BaseObjectRequest<IssueActivityChart> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/analytics/issue_activity_chart"
      this.klass = IssueActivityChart
    }
  }
}
