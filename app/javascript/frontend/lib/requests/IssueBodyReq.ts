import { IssueBody } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"
import BasePaginationRequest from "./BasePaginationRequest"

export default {
  Update: class extends BaseObjectRequest<IssueBody> {
    constructor() {
      super()
      this.method = "PATCH"
      this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/body"
      this.klass = IssueBody
    }
  }
}