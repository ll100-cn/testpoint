import { Requirement } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const List = class extends BaseRequest<Array<Requirement>> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/storyboards/{storyboard_id}/requirements"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToArray(Requirement, response)
  }
}

export const Create = class extends BaseRequest<Requirement> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/projects/{project_id}/storyboards/{storyboard_id}/requirements"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Requirement, response)
  }
}

export const Update = class extends BaseRequest<Requirement> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/storyboards/{storyboard_id}/requirements/{requirement_id}"
    this.headers['Content-Type'] = 'application/json'
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Requirement, response)
  }
}

export const Destroy = class extends BaseRequest<Requirement> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/projects/{project_id}/storyboards/{storyboard_id}/requirements/{requirement_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Requirement, response)
  }
}
