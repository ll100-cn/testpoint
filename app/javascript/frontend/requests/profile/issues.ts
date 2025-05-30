import { Issue, IssueBox, IssuePage, Pagination } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Page = class extends BaseRequest<IssuePage<IssueBox>> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/v2/profile/issues"
    this.graph = "counts"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssuePage<IssueBox>, response)
  }
}
