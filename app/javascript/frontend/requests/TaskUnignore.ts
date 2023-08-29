import { Task } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class TaskUnignore extends BaseObjectRequest<Task> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/plans/{plan_id}/tasks/{id}/unignore"
    this.klass = Task
  }
}
