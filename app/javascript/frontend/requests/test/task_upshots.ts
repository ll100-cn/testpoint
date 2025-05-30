import { TaskUpshotBox, TaskUpshotPage } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const InfoList = class extends BaseRequest<TaskUpshotPage<TaskUpshotBox>> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/v2/projects/{project_id}/plans/{plan_id}/phases/{phase_id}/task_upshots"
    this.graph = "info"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TaskUpshotPage<TaskUpshotBox>, response)
  }
}
