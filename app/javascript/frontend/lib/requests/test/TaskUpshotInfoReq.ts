import { TaskUpshotInfo } from "@/models"
import BaseObjectRequest from "../BaseObjectRequest"
import BaseArrayRequest from "../BaseArrayRequest"

export default {
  Get: class extends BaseObjectRequest<TaskUpshotInfo> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/plans/{plan_id}/phases/{phase_index}/task_upshot_infos/{id}"
      this.klass = TaskUpshotInfo
    }
  },

  List: class extends BaseArrayRequest<TaskUpshotInfo> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/plans/{plan_id}/phases/{phase_index}/task_upshot_infos"
      this.klass = TaskUpshotInfo
    }
  }

}