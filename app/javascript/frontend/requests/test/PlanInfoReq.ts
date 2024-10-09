import { PlanInfo } from "@/models"
import BaseObjectRequest from "../BaseObjectRequest"
import BasePaginationRequest from "../BasePaginationRequest"

export default {
  Get: class extends BaseObjectRequest<PlanInfo> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/plan_infos/{plan_id}"
      this.klass = PlanInfo
    }
  }
}
