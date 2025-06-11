import { UserBox, UserPage } from "@/models"
import type { AxiosResponse } from "axios"
import { BaseRequest } from "../BaseRequest"

export const Update = class extends BaseRequest<UserBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/admin/users", "/{id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(UserBox, response)
  }
}

export const Get = class extends BaseRequest<UserBox> {
  method = "GET"
  endpoint = [ "/api/v2/admin/users", "/{id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(UserBox, response)
  }
}

export const Destroy = class extends BaseRequest<UserBox> {
  method = "DELETE"
  endpoint = [ "/api/v2/admin/users", "/{id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(UserBox, response)
  }
}

export const Create = class extends BaseRequest<UserBox> {
  method = "POST"
  endpoint = [ "/api/v2/admin/users" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(UserBox, response)
  }
}

export const Page = class extends BaseRequest<UserPage<UserBox>> {
  method = "GET"
  endpoint = [ "/api/v2/admin/users" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(UserPage<UserBox>, response)
  }
}
