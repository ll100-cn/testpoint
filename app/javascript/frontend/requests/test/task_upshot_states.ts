import { TaskUpshot } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Update = class extends BaseRequest<TaskUpshot> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/plans/{plan_id}/tasks/{task_id}/upshots/{upshot_id}/state"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TaskUpshot, response)
  }
}
