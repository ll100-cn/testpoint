import { Issue } from "@/models"
import BasePaginationRequest from "./BasePaginationRequest"

export class IssuePaginationList extends BasePaginationRequest<Issue> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/profile/issues"
    this.klass = Issue
  }
}
