import { IssueStat } from "@/models"
import BaseArrayRequest from "../BaseArrayRequest"

export default {
  List: class extends BaseArrayRequest<IssueStat> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/profile/issue_stats"
      this.klass = IssueStat
    }
  }
}