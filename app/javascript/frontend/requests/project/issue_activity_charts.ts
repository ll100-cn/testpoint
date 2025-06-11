import { IssueActivityChart } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Get = class extends BaseRequest<IssueActivityChart> {
  method = "GET"
  endpoint = [ "/api/projects", "/{project_id}", "/analytics/issue_activity_chart" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueActivityChart, response)
  }
}
