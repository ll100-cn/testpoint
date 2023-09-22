import { IssueAction } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export default {
  Create: class extends BaseObjectRequest<IssueAction> {
    constructor() {
      super()
      this.method = "POST"
      this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/issue_actions"
      this.klass = IssueAction
    }
  }
}