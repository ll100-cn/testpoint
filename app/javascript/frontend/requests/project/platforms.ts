import { Platform } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Update = class extends BaseRequest<Platform> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/platforms/{platform_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Platform, response)
  }
}

export const List = class extends BaseRequest<Array<Platform>> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/platforms"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToArray(Platform, response)
  }
}

export const Get = class extends BaseRequest<Platform> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/platforms/{platform_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Platform, response)
  }
}

export const Destroy = class extends BaseRequest<Platform> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/projects/{project_id}/platforms/{platform_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Platform, response)
  }
}

export const Create = class extends BaseRequest<Platform> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/projects/{project_id}/platforms"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Platform, response)
  }
}
