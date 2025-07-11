import { IssueActivityChart } from "@/models"
import { BaseRequest, Scheme } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class GetRequest extends BaseRequest<IssueActivityChart> {
  scheme = Scheme.get({
    endpoint: [ "/api", "/projects/{project_id}", "/analytics/issue_activity_chart" ],
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueActivityChart, response)
  }
}
export const Get = () => new GetRequest()
