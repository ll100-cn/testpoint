import { IssueStat } from "@/models"
import BaseArrayRequest from "./BaseArrayRequest"

export class IssueStats extends BaseArrayRequest<IssueStat> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/issue_stats"
    this.klass = IssueStat
  }
}
