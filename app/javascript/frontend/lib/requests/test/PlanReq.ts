import { Plan } from "@/models"
import BaseObjectRequest from "../BaseObjectRequest"
import BasePaginationRequest from "../BasePaginationRequest"

export default {
  Create: class extends BaseObjectRequest<Plan> {
    constructor() {
      super()
      this.method = "POST"
      this.endpoint = "/api/projects/{project_id}/plans"
      this.klass = Plan
    }
  },

  Update: class extends BaseObjectRequest<Plan> {
    constructor() {
      super()
      this.method = "PATCH"
      this.endpoint = "/api/projects/{project_id}/plans/{plan_id}"
      this.klass = Plan
    }
  },

  Destroy: class extends BaseObjectRequest<Plan> {
    constructor() {
      super()
      this.method = "DELETE"
      this.endpoint = "/api/projects/{project_id}/plans/{plan_id}"
      this.klass = Plan
    }
  },

  Page: class extends BasePaginationRequest<Plan> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/plans"
      this.klass = Plan
    }
  }
}
