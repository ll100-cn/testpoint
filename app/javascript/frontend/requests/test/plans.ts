import { Plan, PlanBox, PlanPage } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Create = class extends BaseRequest<PlanBox> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/v2/projects/{project_id}/plans"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlanBox, response)
  }
}

export const Update = class extends BaseRequest<PlanBox> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/v2/projects/{project_id}/plans/{plan_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlanBox, response)
  }
}

export const Destroy = class extends BaseRequest<PlanBox> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/v2/projects/{project_id}/plans/{plan_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlanBox, response)
  }
}

export const Page = class extends BaseRequest<PlanPage<PlanBox>> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/v2/projects/{project_id}/plans"
    this.graph = "counts"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlanPage<PlanBox>, response)
  }
}

export const InfoGet = class extends BaseRequest<PlanBox> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/v2/projects/{project_id}/plans/{plan_id}"
    this.graph = "counts, info"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlanBox, response)
  }
}
