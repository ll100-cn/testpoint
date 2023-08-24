import { TaskUpshotInfo } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class TaskUpshotStateUpdate extends BaseObjectRequest<TaskUpshotInfo> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/plans/{plan_id}/tasks/{task_id}/upshots/{upshot_id}/state"
    this.klass = TaskUpshotInfo
  }
}
