import { IssueInfo } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class IssueInfoDestroy extends BaseObjectRequest<IssueInfo> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/issue_infos/{issue_info_id}"
    this.klass = IssueInfo
  }
}
