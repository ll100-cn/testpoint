import { SubscriptionBox } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class DestroyRequest extends BaseRequest<SubscriptionBox> {
  method = "DELETE"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issues", "/{issue_id}", "/subscription" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(SubscriptionBox, response)
  }
}
export const Destroy = () => new DestroyRequest()


class CreateRequest extends BaseRequest<SubscriptionBox> {
  method = "POST"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issues", "/{issue_id}", "/subscription" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(SubscriptionBox, response)
  }
}
export const Create = () => new CreateRequest()
