import { TaskUpshotInfo } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class TaskUpshotInfoShow extends BaseObjectRequest<TaskUpshotInfo> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/plans/{plan_id}/phases/{phase_index}/task_upshot_infos/{id}"
    this.klass = TaskUpshotInfo
  }
}
