import { Platform, type PlatformBox, PlatformBoxImpl, PlatformPage } from "@/models"
import { BaseRequest, Scheme } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class UpdateRequest extends BaseRequest<PlatformBox> {
  scheme = Scheme.patch({
    endpoint: "/api/v2/projects/{project_id}/platforms/{platform_id}",
    relatedKeys: [ [ "/platforms", "/{platform_id}" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlatformBoxImpl, response)
  }
}
export const Update = () => new UpdateRequest()


class ListRequest<Box extends PlatformBox> extends BaseRequest<Box[]> {
  scheme = Scheme.get({
    endpoint: [ "/api/v2", "/projects/{project_id}", "/platforms" ],
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlatformPage<Box>, response).list
  }
}
export const List = () => new ListRequest()


class GetRequest extends BaseRequest<PlatformBox> {
  scheme = Scheme.get({
    endpoint: [ "/api/v2", "/projects/{project_id}", "/platforms/{platform_id}" ],
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlatformBoxImpl, response)
  }
}
export const Get = () => new GetRequest()


class DestroyRequest extends BaseRequest<PlatformBox> {
  scheme = Scheme.delete({
    endpoint: "/api/v2/projects/{project_id}/platforms/{platform_id}",
    relatedKeys: [ [ "/platforms" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlatformBoxImpl, response)
  }
}
export const Destroy = () => new DestroyRequest()


class CreateRequest extends BaseRequest<PlatformBox> {
  scheme = Scheme.post({
    endpoint: "/api/v2/projects/{project_id}/platforms",
    relatedKeys: [ [ "/platforms" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(PlatformBoxImpl, response)
  }
}
export const Create = () => new CreateRequest()
