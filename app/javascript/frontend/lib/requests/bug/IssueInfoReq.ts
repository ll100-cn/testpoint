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
  },

  Resolve: class extends BaseObjectRequest<IssueInfo> {
    constructor() {
      super()
      this.method = "PATCH"
      this.endpoint = "/api/projects/{project_id}/issue_infos/{issue_id}/resolve"
      this.klass = IssueInfo
    }
  },

  Process: class extends BaseObjectRequest<IssueInfo> {
    constructor() {
      super()
      this.method = "PATCH"
      this.endpoint = "/api/projects/{project_id}/issue_infos/{issue_id}/process"
      this.klass = IssueInfo
    }
  },
}