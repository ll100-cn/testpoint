import { UserBox, UserPage } from "@/models"
import type { AxiosResponse } from "axios"
import { BaseRequest } from "../BaseRequest"

export const Update = class extends BaseRequest<UserBox> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/v2/admin/users/{id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(UserBox, response)
  }
}

export const Get = class extends BaseRequest<UserBox> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/v2/admin/users/{id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(UserBox, response)
  }
}

export const Destroy = class extends BaseRequest<UserBox> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/v2/admin/users/{id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(UserBox, response)
  }
}

export const Create = class extends BaseRequest<UserBox> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/v2/admin/users"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(UserBox, response)
  }
}

export const Page = class extends BaseRequest<UserPage<UserBox>> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/v2/admin/users"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(UserPage<UserBox>, response)
  }
}
