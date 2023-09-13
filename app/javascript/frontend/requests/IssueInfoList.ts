import BaseArrayRequest from "./BaseArrayRequest"
import { IssueInfo } from "@/models"

export class IssueInfoList extends BaseArrayRequest<IssueInfo> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/issue_infos"
    this.klass = IssueInfo
  }
}
