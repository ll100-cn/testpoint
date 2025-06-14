import { Phase, PhaseBox } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Create = class extends BaseRequest<PhaseBox> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/v2/projects/{project_id}/plans/{plan_id}/phases"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PhaseBox, response)
  }
}
