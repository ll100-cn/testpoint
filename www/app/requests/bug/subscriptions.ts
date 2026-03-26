import { BaseRequest, Scheme } from "../BaseRequest"
import { SubscriptionBoxSchema, type SubscriptionBoxType } from '@/schemas/issue_extra'

class DestroyRequest extends BaseRequest<SubscriptionBoxType> {
  scheme = Scheme.delete({
    endpoint: "/svc/v2/projects/{project_id}/issues/{issue_id}/subscription",
    relatedKeys: [ [ "/issues", "/{issue_id}" ], [ "/subscription" ] ]
  })

  schema = SubscriptionBoxSchema
}
export const Destroy = () => new DestroyRequest()


class CreateRequest extends BaseRequest<SubscriptionBoxType> {
  scheme = Scheme.post({
    endpoint: "/svc/v2/projects/{project_id}/issues/{issue_id}/subscription",
    relatedKeys: [ [ "/issues", "/{issue_id}" ], [ "/subscription" ] ]
  })

  schema = SubscriptionBoxSchema
}
export const Create = () => new CreateRequest()
