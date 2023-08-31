import { IssueSummary } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class IssueSummaryGet extends BaseObjectRequest<IssueSummary> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/issues/summary"
    this.klass = IssueSummary
  }
}
