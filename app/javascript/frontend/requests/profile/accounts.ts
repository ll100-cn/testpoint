import { Account } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Get = class extends BaseRequest<Account> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/profile/account"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Account, response)
  }
}

export const Update = class extends BaseRequest<Account> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/profile/account"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Account, response)
  }
}
