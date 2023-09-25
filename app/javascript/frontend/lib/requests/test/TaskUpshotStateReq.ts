import { TaskUpshotInfo } from "@/models"
import BaseObjectRequest from "../BaseObjectRequest"

export default {
  Update: class extends BaseObjectRequest<TaskUpshotInfo> {
    constructor() {
      super()
      this.method = "PATCH"
      this.endpoint = "/api/projects/{project_id}/plans/{plan_id}/tasks/{task_id}/upshots/{upshot_id}/state"
      this.klass = TaskUpshotInfo
    }
  }

}