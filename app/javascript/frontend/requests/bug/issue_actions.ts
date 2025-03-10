import { IssueAction } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Create = class extends BaseRequest<IssueAction> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/issue_actions"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueAction, response)
  }
}
