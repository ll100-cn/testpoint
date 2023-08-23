import { Plan } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class PlanDestroy extends BaseObjectRequest<Plan> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/projects/{project_id}/plans/{plan_id}"
    this.klass = Plan
  }
}
