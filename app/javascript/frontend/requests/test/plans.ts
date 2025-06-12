import { MemberPage, Plan, PlanBox, PlanPage } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"
import type { Required } from "utility-types"

class CreateRequest extends BaseRequest<PlanBox> {
  method = "POST"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/plans" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlanBox, response)
  }
}
export const Create = () => new CreateRequest()


class UpdateRequest extends BaseRequest<PlanBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/plans", "/{plan_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlanBox, response)
  }
}
export const Update = () => new UpdateRequest()


class DestroyRequest extends BaseRequest<PlanBox> {
  method = "DELETE"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/plans", "/{plan_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlanBox, response)
  }
}
export const Destroy = () => new DestroyRequest()


class PageRequest extends BaseRequest<PlanPage<PlanBox>> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/plans" ]
  graph = "counts"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlanPage<PlanBox>, response)
  }
}
export const Page = () => new PageRequest()


class InfoGetRequest extends BaseRequest<PlanBox> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/plans", "/{plan_id}" ]
  graph = "counts, info"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlanBox, response)
  }
}
export const InfoGet = () => new InfoGetRequest()


class GetRequest<Box extends PlanBox> extends BaseRequest<Box> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/plans", "/{plan_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlanBox, response) as Box
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