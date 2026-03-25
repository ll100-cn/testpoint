import { type UserBox, UserBoxImpl, UserPage } from "@/models"
import type { AxiosResponse } from "axios"
import { BaseRequest, Scheme } from "../BaseRequest"

class UpdateRequest extends BaseRequest<UserBox> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/admin/users/{id}",
    relatedKeys: [ [ "/users", "/{id}" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(UserBoxImpl, response)
  }
}
export const Update = () => new UpdateRequest()


class GetRequest extends BaseRequest<UserBox> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2/admin", "/users/{id}" ],
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(UserBoxImpl, response)
  }
}
export const Get = () => new GetRequest()


class DestroyRequest extends BaseRequest<UserBox> {
  scheme = Scheme.delete({
    endpoint: "/svc/v2/admin/users/{id}",
    relatedKeys: [ "/users" ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(UserBoxImpl, response)
  }
}
export const Destroy = () => new DestroyRequest()


class CreateRequest extends BaseRequest<UserBox> {
  scheme = Scheme.post({
    endpoint: "/svc/v2/admin/users",
    relatedKeys: [ "/users" ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(UserBoxImpl, response)
  }
}
export const Create = () => new CreateRequest()


class PageRequest extends BaseRequest<UserPage<UserBox>> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2/admin", "/users" ],
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(UserPage<UserBox>, response)
  }
}
export const Page = () => new PageRequest()