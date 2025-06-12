import { UserBox, UserPage } from "@/models"
import type { AxiosResponse } from "axios"
import { BaseRequest } from "../BaseRequest"

class UpdateRequest extends BaseRequest<UserBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/admin/users", "/{id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(UserBox, response)
  }
}
export const Update = () => new UpdateRequest()


class GetRequest extends BaseRequest<UserBox> {
  method = "GET"
  endpoint = [ "/api/v2/admin/users", "/{id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(UserBox, response)
  }
}
export const Get = () => new GetRequest()


class DestroyRequest extends BaseRequest<UserBox> {
  method = "DELETE"
  endpoint = [ "/api/v2/admin/users", "/{id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(UserBox, response)
  }
}
export const Destroy = () => new DestroyRequest()


class CreateRequest extends BaseRequest<UserBox> {
  method = "POST"
  endpoint = [ "/api/v2/admin/users" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(UserBox, response)
  }
}
export const Create = () => new CreateRequest()


class PageRequest extends BaseRequest<UserPage<UserBox>> {
  method = "GET"
  endpoint = [ "/api/v2/admin/users" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(UserPage<UserBox>, response)
  }
}
export const Page = () => new PageRequest()