import { Phase, type PhaseBox, PhaseBoxImpl } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class CreateRequest extends BaseRequest<PhaseBox> {
  method = "POST"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/plans", "/{plan_id}", "/phases" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PhaseBoxImpl, response)
  }
}
export const Create = () => new CreateRequest()
