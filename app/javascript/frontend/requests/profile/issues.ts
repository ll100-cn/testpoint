import { Issue, Pagination } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Page = class extends BaseRequest<Pagination<Issue>> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/profile/issues"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToPagination(Issue, response)
  }
}
