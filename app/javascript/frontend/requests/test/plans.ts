import { MemberPage, Plan, type PlanBox, PlanBoxImpl, PlanPage } from "@/models"
import { BaseRequest, Scheme } from "../BaseRequest"
import type { AxiosResponse } from "axios"
import type { Required } from "utility-types"

class CreateRequest extends BaseRequest<PlanBox> {
  scheme = Scheme.post({
    endpoint: "/api/v2/projects/{project_id}/plans",
    relatedKeys: [ [ "/plans" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlanBoxImpl, response)
  }
}
export const Create = () => new CreateRequest()


class UpdateRequest extends BaseRequest<PlanBox> {
  scheme = Scheme.patch({
    endpoint: "/api/v2/projects/{project_id}/plans/{plan_id}",
    relatedKeys: [ [ "/plans", "/{plan_id}" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlanBoxImpl, response)
  }
}
export const Update = () => new UpdateRequest()


class DestroyRequest extends BaseRequest<PlanBox> {
  scheme = Scheme.delete({
    endpoint: "/api/v2/projects/{project_id}/plans/{plan_id}",
    relatedKeys: [ [ "/plans" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlanBoxImpl, response)
  }
}
export const Destroy = () => new DestroyRequest()


class PageRequest extends BaseRequest<PlanPage<PlanBox>> {
  scheme = Scheme.get({
    endpoint: [ "/api/v2", "/projects/{project_id}", "/plans" ],
  })
  graph = "counts"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlanPage<PlanBox>, response)
  }
}
export const Page = () => new PageRequest()


class InfoGetRequest extends BaseRequest<PlanBox> {
  scheme = Scheme.get({
    endpoint: [ "/api/v2", "/projects/{project_id}", "/plans/{plan_id}" ],
  })
  graph = "counts, info"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlanBoxImpl, response)
  }
}
export const InfoGet = () => new InfoGetRequest()


class GetRequest<Box extends PlanBox> extends BaseRequest<Box> {
  scheme = Scheme.get({
    endpoint: [ "/api/v2", "/projects/{project_id}", "/plans/{plan_id}" ],
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlanBoxImpl, response) as Box
  }
}
export function Get(): InstanceType<typeof GetRequest<PlanBox>>
export function Get(graph: '+phase'): InstanceType<typeof GetRequest<Required<PlanBox, 'phase_infos'>>>
export function Get(graph?: string) {
  const request = new GetRequest<PlanBox>()
  request.graph = graph ?? null

  if (graph == "+phase") {
    request.graph = 'info'
  }

  return request as any
}