import { type SubscriptionBox, SubscriptionBoxImpl } from "@/models"
import { BaseRequest, Scheme } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class DestroyRequest extends BaseRequest<SubscriptionBox> {
  scheme = Scheme.delete({
    endpoint: "/svc/v2/projects/{project_id}/issues/{issue_id}/subscription",
    relatedKeys: [ [ "/issues", "/{issue_id}" ], [ "/subscription" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(SubscriptionBoxImpl, response)
  }
}
export const Destroy = () => new DestroyRequest()


class CreateRequest extends BaseRequest<SubscriptionBox> {
  scheme = Scheme.post({
    endpoint: "/svc/v2/projects/{project_id}/issues/{issue_id}/subscription",
    relatedKeys: [ [ "/issues", "/{issue_id}" ], [ "/subscription" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(SubscriptionBoxImpl, response)
  }
}
export const Create = () => new CreateRequest()
