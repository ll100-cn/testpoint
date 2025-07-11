import { type IssueBodyBox, IssueBodyBoxImpl } from "@/models"
import { BaseRequest, Scheme } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class UpdateRequest extends BaseRequest<IssueBodyBox> {
  scheme = Scheme.patch({
    endpoint: "/api/v2/projects/{project_id}/issues/{issue_id}/body",
    relatedKeys: [ [ "/issues", "/{issue_id}" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueBodyBoxImpl, response)
  }
}
export const Update = () => new UpdateRequest()


class ConvertRequest extends BaseRequest<IssueBodyBox> {
  scheme = Scheme.patch({
    endpoint: "/api/v2/projects/{project_id}/issues/{issue_id}/body/convert_comment",
    relatedKeys: [ [ "/issues", "/{issue_id}" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueBodyBoxImpl, response)
  }
}
export const Convert = () => new ConvertRequest()
