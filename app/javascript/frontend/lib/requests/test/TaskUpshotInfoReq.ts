import { TaskUpshotInfo } from "@/models"
import BaseArrayRequest from "../BaseArrayRequest"

export default {
  List: class extends BaseArrayRequest<TaskUpshotInfo> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/plans/{plan_id}/phases/{phase_id}/task_upshot_infos"
      this.klass = TaskUpshotInfo
    }
  }
}