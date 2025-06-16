import { Platform, type PlatformBox, PlatformBoxImpl, PlatformPage } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class UpdateRequest extends BaseRequest<PlatformBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/platforms", "/{platform_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlatformBoxImpl, response)
  }
}
export const Update = () => new UpdateRequest()


class ListRequest<Box extends PlatformBox> extends BaseRequest<Box[]> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/platforms" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlatformPage<Box>, response).list
  }
}
export const List = () => new ListRequest()


class GetRequest extends BaseRequest<PlatformBox> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/platforms", "/{platform_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlatformBoxImpl, response)
  }
}
export const Get = () => new GetRequest()


class DestroyRequest extends BaseRequest<PlatformBox> {
  method = "DELETE"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/platforms", "/{platform_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlatformBoxImpl, response)
  }
}
export const Destroy = () => new DestroyRequest()


class CreateRequest extends BaseRequest<PlatformBox> {
  method = "POST"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/platforms" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlatformBoxImpl, response)
  }
}
export const Create = () => new CreateRequest()
