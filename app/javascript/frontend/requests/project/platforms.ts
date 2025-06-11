import { Platform, PlatformBox, PlatformPage } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Update = class extends BaseRequest<PlatformBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/platforms", "/{platform_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlatformBox, response)
  }
}

export const List = class extends BaseRequest<PlatformPage<PlatformBox>> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/platforms" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlatformPage<PlatformBox>, response)
  }
}

export const Get = class extends BaseRequest<PlatformBox> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/platforms", "/{platform_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlatformBox, response)
  }
}

export const Destroy = class extends BaseRequest<PlatformBox> {
  method = "DELETE"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/platforms", "/{platform_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlatformBox, response)
  }
}

export const Create = class extends BaseRequest<PlatformBox> {
  method = "POST"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/platforms" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlatformBox, response)
  }
}
