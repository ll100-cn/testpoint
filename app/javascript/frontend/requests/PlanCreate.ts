import { Plan } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class PlanCreate extends BaseObjectRequest<Plan> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/projects/{project_id}/plans"
    this.klass = Plan
  }
}
