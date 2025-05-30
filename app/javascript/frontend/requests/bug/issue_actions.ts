import { IssueAction, IssueActionBox } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Create = class extends BaseRequest<IssueActionBox> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/v2/projects/{project_id}/issues/{issue_id}/issue_actions"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueActionBox, response)
  }
}
