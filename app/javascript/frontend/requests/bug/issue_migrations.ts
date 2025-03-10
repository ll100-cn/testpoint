import { Issue } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Create = class extends BaseRequest<void> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/projects/{project_id}/issue_migrations"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Issue, response)
  }
}
