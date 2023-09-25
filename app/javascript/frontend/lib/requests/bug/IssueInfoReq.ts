import { IssueInfo } from "@/models"
import BaseObjectRequest from "../BaseObjectRequest"

export default {
  Get: class extends BaseObjectRequest<IssueInfo> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/issue_infos/{issue_id}"
      this.klass = IssueInfo
    }
  }
}