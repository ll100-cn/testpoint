import { PhaseInfo } from "@/models"
import BaseArrayRequest from "../BaseArrayRequest"

export default {
  List: class extends BaseArrayRequest<PhaseInfo> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/plans/{plan_id}/phase_infos"
      this.klass = PhaseInfo
    }
  }
}