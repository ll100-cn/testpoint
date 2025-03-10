import { Plan, Pagination, PlanInfo } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Create = class extends BaseRequest<Plan> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/projects/{project_id}/plans"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Plan, response)
  }
}

export const Update = class extends BaseRequest<Plan> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/plans/{plan_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Plan, response)
  }
}

export const Destroy = class extends BaseRequest<Plan> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/projects/{project_id}/plans/{plan_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Plan, response)
  }
}

export const Page = class extends BaseRequest<Pagination<Plan>> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/plans"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToPagination(Plan, response)
  }
}


export const InfoGet = class extends BaseRequest<PlanInfo> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/plan_infos/{plan_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlanInfo, response)
  }
}
