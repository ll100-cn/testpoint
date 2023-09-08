import { IssueActivity } from "@/models"
import BaseArrayRequest from "./BaseArrayRequest"

export class IssueActivitiyList extends BaseArrayRequest<IssueActivity> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/activities"
    this.klass = IssueActivity
  }
}
