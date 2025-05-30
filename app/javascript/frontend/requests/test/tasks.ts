import { Task, TaskBox } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Ignore = class extends BaseRequest<TaskBox> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/v2/projects/{project_id}/plans/{plan_id}/tasks/{id}/ignore"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TaskBox, response)
  }
}

export const Unignore = class extends BaseRequest<TaskBox> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/v2/projects/{project_id}/plans/{plan_id}/tasks/{id}/unignore"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TaskBox, response)
  }
}

export const InfoGet = class extends BaseRequest<TaskBox> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/v2/projects/{project_id}/plans/{plan_id}/tasks/{task_id}"
    this.graph = "info"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TaskBox, response)
  }
}
