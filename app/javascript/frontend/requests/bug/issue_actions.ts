import { type IssueActionBox, IssueActionBoxImpl } from "@/models"
import { BaseRequest, Scheme } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class CreateRequest extends BaseRequest<IssueActionBox> {
  scheme = Scheme.post({
    endpoint: "/api/v2/projects/{project_id}/issues/{issue_id}/issue_actions",
    relatedKeys: [ [ "/issues", "/{issue_id}" ], [ "/issue_actions" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueActionBoxImpl, response)
  }
}
export const Create = () => new CreateRequest()
