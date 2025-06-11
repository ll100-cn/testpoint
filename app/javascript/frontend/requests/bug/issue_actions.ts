import { IssueAction, IssueActionBox } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Create = class extends BaseRequest<IssueActionBox> {
  method = "POST"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issues", "/{issue_id}", "/issue_actions" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueActionBox, response)
  }
}
