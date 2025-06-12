import { IssueAction, IssueActionBox } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class CreateRequest extends BaseRequest<IssueActionBox> {
  method = "POST"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issues", "/{issue_id}", "/issue_actions" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueActionBox, response)
  }
}
export const Create = () => new CreateRequest()
