import { User, Pagination } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Update = class extends BaseRequest<User> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/admin/users/{id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(User, response)
  }
}

export const Get = class extends BaseRequest<User> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/admin/users/{id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(User, response)
  }
}

export const Destroy = class extends BaseRequest<User> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/admin/users/{id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(User, response)
  }
}

export const Create = class extends BaseRequest<User> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/admin/users"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(User, response)
  }
}

export const Page = class extends BaseRequest<Pagination<User>> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/admin/users"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToPagination(User, response)
  }
}
