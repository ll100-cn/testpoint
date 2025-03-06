import { Storyboard } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const List = class extends BaseRequest<Array<Storyboard>> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/storyboards"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToArray(Storyboard, response)
  }
}

export const Get = class extends BaseRequest<Storyboard> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/storyboards/{storyboard_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Storyboard, response)
  }
}

export const Create = class extends BaseRequest<Storyboard> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/projects/{project_id}/storyboards"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Storyboard, response)
  }
}

export const Update = class extends BaseRequest<Storyboard> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/storyboards/{storyboard_id}"
    this.headers['Content-Type'] = 'application/json'
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Storyboard, response)
  }
}

export const Destroy = class extends BaseRequest<Storyboard> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/projects/{project_id}/storyboards/{storyboard_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Storyboard, response)
  }
}
