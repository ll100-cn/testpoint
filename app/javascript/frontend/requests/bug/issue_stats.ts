import { IssueStat } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const List = class extends BaseRequest<Array<IssueStat>> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/issue_stats"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToArray(IssueStat, response)
  }
}
