import { IssueBodyBox } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Update = class extends BaseRequest<IssueBodyBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issues", "/{issue_id}", "/body" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueBodyBox, response)
  }
}

export const Convert = class extends BaseRequest<IssueBodyBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issues", "/{issue_id}", "/body/convert_comment" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueBodyBox, response)
  }
}
