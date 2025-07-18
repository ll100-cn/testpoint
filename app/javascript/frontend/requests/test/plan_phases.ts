import { Phase, type PhaseBox, PhaseBoxImpl } from "@/models"
import { BaseRequest, Scheme } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class CreateRequest extends BaseRequest<PhaseBox> {
  scheme = Scheme.post({
    endpoint: "/api/v2/projects/{project_id}/plans/{plan_id}/phases",
    relatedKeys: [ [ "/plans", "/{plan_id}" ], [ "/phases" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PhaseBoxImpl, response)
  }
}
export const Create = () => new CreateRequest()
