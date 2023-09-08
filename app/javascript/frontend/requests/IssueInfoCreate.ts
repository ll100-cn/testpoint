import BaseObjectRequest from "./BaseObjectRequest"
import { IssueInfo } from "@/models"

export class IssueInfoCreate extends BaseObjectRequest<IssueInfo> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/issue_infos"
    this.klass = IssueInfo
  }
}
