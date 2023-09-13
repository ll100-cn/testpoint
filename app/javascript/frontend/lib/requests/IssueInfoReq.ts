import { BaseArrayRequest } from "."
import BaseObjectRequest from "./BaseObjectRequest"
import { IssueInfo } from "@/models"

export default {
  Create: class extends BaseObjectRequest<IssueInfo> {
    constructor() {
      super()
      this.method = "POST"
      this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/issue_infos"
      this.klass = IssueInfo
    }
  },

  Destroy: class extends BaseObjectRequest<IssueInfo> {
    constructor() {
      super()
      this.method = "DELETE"
      this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/issue_infos/{issue_info_id}"
      this.klass = IssueInfo
    }
  },

  List: class extends BaseArrayRequest<IssueInfo> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/issue_infos"
      this.klass = IssueInfo
    }
  },

  Update: class extends BaseObjectRequest<IssueInfo> {
    constructor() {
      super()
      this.method = "PATCH"
      this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/issue_infos/{issue_info_id}"
      this.klass = IssueInfo
    }
  }
}
