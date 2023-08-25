import { TaskInfo } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class TaskInfoShow extends BaseObjectRequest<TaskInfo> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/plans/{plan_id}/task_infos/{task_id}"
    this.klass = TaskInfo
  }
}
