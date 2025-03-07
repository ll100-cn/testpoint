import { IssueSummary } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Get = class extends BaseRequest<IssueSummary> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/issue_summaries"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueSummary, response)
  }
}
