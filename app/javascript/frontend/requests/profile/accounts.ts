import { Account, AccountBox } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Get = class extends BaseRequest<AccountBox> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/v2/profile/account"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(AccountBox, response)
  }
}

export const Update = class extends BaseRequest<AccountBox> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/v2/profile/account"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(AccountBox, response)
  }
}
