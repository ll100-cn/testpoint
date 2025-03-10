import { Phase } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Create = class extends BaseRequest<Phase> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/projects/{project_id}/plans/{plan_id}/phases"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Phase, response)
  }
}
