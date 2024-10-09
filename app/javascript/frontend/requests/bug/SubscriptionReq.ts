import { Subscription } from "@/models"
import BaseObjectRequest from "../BaseObjectRequest"

export default {
  Destroy: class extends BaseObjectRequest<Subscription> {
    constructor() {
      super()
      this.method = "DELETE"
      this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/subscription"
      this.klass = Subscription
    }
  },

  Create: class extends BaseObjectRequest<Subscription> {
    constructor() {
      super()
      this.method = "POST"
      this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/subscription"
      this.klass = Subscription
    }
  }
}