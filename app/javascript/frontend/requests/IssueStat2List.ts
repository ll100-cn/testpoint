import { IssueStat2 } from "@/models"
import BaseArrayRequest from "./BaseArrayRequest"

export class IssueStat2List extends BaseArrayRequest<IssueStat2> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/profile/issue_stats"
    this.klass = IssueStat2
  }
}
