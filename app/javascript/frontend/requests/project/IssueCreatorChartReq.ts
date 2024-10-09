import { BaseObjectRequest } from ".."
import { IssueCreatorChart } from "@/models"

export default {
  Get: class extends BaseObjectRequest<IssueCreatorChart> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/analytics/issue_creator_chart"
      this.klass = IssueCreatorChart
    }
  },
}
