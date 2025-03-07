import { Task, TaskInfo } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Ignore = class extends BaseRequest<Task> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/plans/{plan_id}/tasks/{id}/ignore"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Task, response)
  }
}

export const Unignore = class extends BaseRequest<Task> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/plans/{plan_id}/tasks/{id}/unignore"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Task, response)
  }
}

export const InfoGet = class extends BaseRequest<TaskInfo> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/plans/{plan_id}/task_infos/{task_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TaskInfo, response)
  }
}
