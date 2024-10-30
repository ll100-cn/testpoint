import { Issue } from "@/models"
import BasePaginationRequest from "../BasePaginationRequest"

export default {
  Page: class extends BasePaginationRequest<Issue> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/profile/issues"
      this.klass = Issue
    }
  }
}