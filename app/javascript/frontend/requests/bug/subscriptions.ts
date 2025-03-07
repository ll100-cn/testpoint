import { Subscription } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Destroy = class extends BaseRequest<Subscription> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/subscription"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Subscription, response)
  }
}

export const Create = class extends BaseRequest<Subscription> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/subscription"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Subscription, response)
  }
}
