import { Platform, PlatformBox, PlatformPage } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Update = class extends BaseRequest<PlatformBox> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/v2/projects/{project_id}/platforms/{platform_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlatformBox, response)
  }
}

export const List = class extends BaseRequest<PlatformPage<PlatformBox>> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/v2/projects/{project_id}/platforms"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlatformPage<PlatformBox>, response)
  }
}

export const Get = class extends BaseRequest<PlatformBox> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/v2/projects/{project_id}/platforms/{platform_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlatformBox, response)
  }
}

export const Destroy = class extends BaseRequest<PlatformBox> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/v2/projects/{project_id}/platforms/{platform_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlatformBox, response)
  }
}

export const Create = class extends BaseRequest<PlatformBox> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/v2/projects/{project_id}/platforms"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlatformBox, response)
  }
}
