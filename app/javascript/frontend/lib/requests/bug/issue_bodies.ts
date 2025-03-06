import { IssueBody } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Update = class extends BaseRequest<IssueBody> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/body"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueBody, response)
  }
}

export const Convert = class extends BaseRequest<IssueBody> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/body/convert_comment"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueBody, response)
  }
}
