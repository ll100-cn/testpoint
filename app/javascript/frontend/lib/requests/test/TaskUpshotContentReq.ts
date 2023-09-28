import { TaskUpshot } from "@/models"
import BaseObjectRequest from "../BaseObjectRequest"

export default {
  Update: class extends BaseObjectRequest<TaskUpshot> {
    constructor() {
      super()
      this.method = "PATCH"
      this.endpoint = "/api/projects/{project_id}/plans/{plan_id}/tasks/{task_id}/upshots/{upshot_id}/content"
      this.klass = TaskUpshot
    }
  }
}