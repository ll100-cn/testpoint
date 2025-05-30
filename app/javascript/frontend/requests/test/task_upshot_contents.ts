import { TaskUpshot, TaskUpshotBox } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Update = class extends BaseRequest<TaskUpshotBox> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/v2/projects/{project_id}/plans/{plan_id}/tasks/{task_id}/upshots/{upshot_id}/content"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TaskUpshotBox, response)
  }
}
