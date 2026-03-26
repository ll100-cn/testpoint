import { BaseRequest, Scheme } from "../BaseRequest"
import {
  PlanBodySchema,
  PlanBoxSchema,
  PlanInfoBoxSchema,
  PlanPageSchema,
  type PlanBoxType,
  type PlanInfoBoxType,
  type PlanPageType,
} from '@/schemas/plan'

class CreateRequest extends BaseRequest<PlanBoxType> {
  scheme = Scheme.post({
    endpoint: "/svc/v2/projects/{project_id}/plans",
    relatedKeys: [ "/plans" ]
  })
  schema = PlanBoxSchema
  bodySchema = PlanBodySchema
}
export const Create = () => new CreateRequest()


class UpdateRequest extends BaseRequest<PlanBoxType> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/plans/{plan_id}",
    relatedKeys: [ [ "/plans", "/{plan_id}" ], "/plans" ]
  })
  schema = PlanBoxSchema
  bodySchema = PlanBodySchema
}
export const Update = () => new UpdateRequest()


class DestroyRequest extends BaseRequest<PlanBoxType> {
  scheme = Scheme.delete({
    endpoint: "/svc/v2/projects/{project_id}/plans/{plan_id}",
    relatedKeys: [ "/plans" ]
  })
  schema = PlanBoxSchema
}
export const Destroy = () => new DestroyRequest()


class PageRequest extends BaseRequest<PlanPageType> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/plans" ],
  })
  graph = "counts"
  schema = PlanPageSchema
}
export const Page = () => new PageRequest()


class InfoGetRequest extends BaseRequest<PlanInfoBoxType> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/plans/{plan_id}" ],
  })
  graph = "counts, info"
  schema = PlanInfoBoxSchema
}
export const InfoGet = () => new InfoGetRequest()


class GetRequest<T> extends BaseRequest<T> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/plans/{plan_id}" ],
  })
}
export function Get(): GetRequest<PlanBoxType>
export function Get(graph: '+phase'): GetRequest<PlanInfoBoxType>
export function Get(graph: '+info'): GetRequest<PlanInfoBoxType>
export function Get(graph?: '+phase' | '+info') {
  const request = new GetRequest<PlanBoxType>()
  request.schema = PlanBoxSchema

  if (graph == "+phase" || graph == '+info') {
    request.graph = 'info'
    request.schema = PlanInfoBoxSchema
  }

  return request as GetRequest<PlanBoxType | PlanInfoBoxType>
}
