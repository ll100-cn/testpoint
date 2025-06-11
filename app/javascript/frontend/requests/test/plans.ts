import { Plan, PlanBox, PlanPage } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Create = class extends BaseRequest<PlanBox> {
  method = "POST"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/plans" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlanBox, response)
  }
}

export const Update = class extends BaseRequest<PlanBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/plans", "/{plan_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlanBox, response)
  }
}

export const Destroy = class extends BaseRequest<PlanBox> {
  method = "DELETE"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/plans", "/{plan_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlanBox, response)
  }
}

export const Page = class extends BaseRequest<PlanPage<PlanBox>> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/plans" ]
  graph = "counts"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlanPage<PlanBox>, response)
  }
}

export const InfoGet = class extends BaseRequest<PlanBox> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/plans", "/{plan_id}" ]
  graph = "counts, info"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlanBox, response)
  }
}
