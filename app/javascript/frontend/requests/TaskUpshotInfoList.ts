import { TaskUpshotInfo } from "@/models"
import BaseArrayRequest from "./BaseArrayRequest"

export class TaskUpshotInfoList extends BaseArrayRequest<TaskUpshotInfo> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/plans/{plan_id}/phases/{phase_index}/task_upshot_infos"
    this.klass = TaskUpshotInfo
  }
}
