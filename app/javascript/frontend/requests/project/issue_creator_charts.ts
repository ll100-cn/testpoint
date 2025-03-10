import { BaseRequest } from ".."
import { IssueCreatorChart } from "@/models"
import type { AxiosResponse } from "axios"

export const Get = class extends BaseRequest<IssueCreatorChart> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/analytics/issue_creator_chart"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueCreatorChart, response)
  }
}
