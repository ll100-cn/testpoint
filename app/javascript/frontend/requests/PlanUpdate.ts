import { Plan } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class PlanUpdate extends BaseObjectRequest<Plan> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/plans/{plan_id}"
    this.klass = Plan
  }
}
