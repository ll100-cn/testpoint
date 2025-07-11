import { IssueCreatorChart } from "@/models"
import { BaseRequest, Scheme } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class GetRequest extends BaseRequest<IssueCreatorChart> {
  scheme = Scheme.get({
    endpoint: [ "/api", "/projects/{project_id}", "/analytics/issue_creator_chart" ],
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueCreatorChart, response)
  }
}
export const Get = () => new GetRequest()
