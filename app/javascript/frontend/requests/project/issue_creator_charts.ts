import { IssueCreatorChart } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class GetRequest extends BaseRequest<IssueCreatorChart> {
  method = "GET"
  endpoint = [ "/api/projects", "/{project_id}", "/analytics/issue_creator_chart" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueCreatorChart, response)
  }
}
export const Get = () => new GetRequest()
