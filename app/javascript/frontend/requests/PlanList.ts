import { Plan } from "@/models"
import BasePaginationRequest from "./BasePaginationRequest"

export class PlanList extends BasePaginationRequest<Plan> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/plans"
    this.klass = Plan
  }
}
