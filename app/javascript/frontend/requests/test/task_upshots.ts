import { TaskUpshotInfo } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const InfoList = class extends BaseRequest<Array<TaskUpshotInfo>> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/plans/{plan_id}/phases/{phase_id}/task_upshot_infos"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToArray(TaskUpshotInfo, response)
  }
}
