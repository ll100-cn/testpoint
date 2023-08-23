import { Plan } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class PlanShow extends BaseObjectRequest<Plan> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/plans/{plan_id}"
    this.klass = Plan
  }
}
