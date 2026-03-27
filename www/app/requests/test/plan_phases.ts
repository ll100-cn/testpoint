import { BaseRequest, Scheme } from "../BaseRequest"
import { PhaseBodySchema, PhaseBoxSchema, type PhaseBoxType } from '@/schemas/phase'

class CreateRequest extends BaseRequest<PhaseBoxType> {
  scheme = Scheme.post({
    endpoint: "/svc/v2/projects/{project_id}/plans/{plan_id}/phases",
    relatedKeys: [ [ "/plans", "/{plan_id}" ] ]
  })
  schema = PhaseBoxSchema
  bodySchema = PhaseBodySchema
}
export const Create = () => new CreateRequest()
