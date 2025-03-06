import { Milestone } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Create = class extends BaseRequest<Milestone> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/projects/{project_id}/milestones"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Milestone, response)
  }
}

export const Get = class extends BaseRequest<Milestone> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/milestones/{id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Milestone, response)
  }
}

export const Update = class extends BaseRequest<Milestone> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/milestones/{id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Milestone, response)
  }
}

export const List = class extends BaseRequest<Array<Milestone>> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/milestones"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToArray(Milestone, response)
  }
}

export const Destroy = class extends BaseRequest<Milestone> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/projects/{project_id}/milestones/{id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Milestone, response)
  }
}

export const Archive = class extends BaseRequest<Milestone> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/milestones/{id}/archive"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Milestone, response)
  }
}

export const Active = class extends BaseRequest<Milestone> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/milestones/{id}/active"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Milestone, response)
  }
}
