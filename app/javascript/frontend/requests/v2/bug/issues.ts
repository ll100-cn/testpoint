import { Issue, IssueInfo, Pagination } from "@/models"
import { BaseRequest } from "../../BaseRequest"
import type { AxiosResponse } from "axios"
import { IssuePage } from "@/models/v2"

export const page = class extends BaseRequest<IssuePage> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/v2/projects/{project_id}/issues"
    this.graph = "counts"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssuePage, response)
  }
}
