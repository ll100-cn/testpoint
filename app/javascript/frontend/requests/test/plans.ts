import { Plan, PlanBox, PlanPage } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

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
