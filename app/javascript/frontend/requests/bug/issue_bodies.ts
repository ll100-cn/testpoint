import { type IssueBodyBox, IssueBodyBoxImpl } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class UpdateRequest extends BaseRequest<IssueBodyBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issues", "/{issue_id}", "/body" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueBodyBoxImpl, response)
  }
}
export const Update = () => new UpdateRequest()


class ConvertRequest extends BaseRequest<IssueBodyBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issues", "/{issue_id}", "/body/convert_comment" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueBodyBoxImpl, response)
  }
}
export const Convert = () => new ConvertRequest()
