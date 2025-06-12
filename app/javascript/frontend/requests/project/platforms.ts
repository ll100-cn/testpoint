import { Platform, PlatformBox, PlatformPage } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class UpdateRequest extends BaseRequest<PlatformBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/platforms", "/{platform_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlatformBox, response)
  }
}
export const Update = () => new UpdateRequest()


class ListRequest extends BaseRequest<PlatformPage<PlatformBox>> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/platforms" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlatformPage<PlatformBox>, response)
  }
}
export const List = () => new ListRequest()


class GetRequest extends BaseRequest<PlatformBox> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/platforms", "/{platform_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlatformBox, response)
  }
}
export const Get = () => new GetRequest()


class DestroyRequest extends BaseRequest<PlatformBox> {
  method = "DELETE"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/platforms", "/{platform_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlatformBox, response)
  }
}
export const Destroy = () => new DestroyRequest()


class CreateRequest extends BaseRequest<PlatformBox> {
  method = "POST"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/platforms" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlatformBox, response)
  }
}
export const Create = () => new CreateRequest()
