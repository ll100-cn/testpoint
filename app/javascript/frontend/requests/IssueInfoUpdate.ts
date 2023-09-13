import BaseObjectRequest from "./BaseObjectRequest"
import { IssueInfo } from "@/models"

export class IssueInfoUpdate extends BaseObjectRequest<IssueInfo> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/issue_infos/{issue_info_id}"
    this.klass = IssueInfo
  }
}
