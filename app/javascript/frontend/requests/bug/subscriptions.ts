import { Subscription } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class DestroyRequest extends BaseRequest<Subscription> {
  method = "DELETE"
  endpoint = [ "/api/projects", "/{project_id}", "/issues", "/{issue_id}", "/subscription" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Subscription, response)
  }
}
export const Destroy = () => new DestroyRequest()


class CreateRequest extends BaseRequest<Subscription> {
  method = "POST"
  endpoint = [ "/api/projects", "/{project_id}", "/issues", "/{issue_id}", "/subscription" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Subscription, response)
  }
}
export const Create = () => new CreateRequest()
