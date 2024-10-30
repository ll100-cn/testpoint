import { Phase } from "@/models"
import BaseObjectRequest from "../BaseObjectRequest"

export default {
  Create: class extends BaseObjectRequest<Phase> {
    constructor() {
      super()
      this.method = "POST"
      this.endpoint = "/api/projects/{project_id}/plans/{plan_id}/phases"
      this.klass = Phase
    }
  }
}