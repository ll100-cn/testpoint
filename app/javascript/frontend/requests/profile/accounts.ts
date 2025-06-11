import { Account, AccountBox } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Get = class extends BaseRequest<AccountBox> {
  method = "GET"
  endpoint = [ "/api/v2/profile/account" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(AccountBox, response)
  }
}

export const Update = class extends BaseRequest<AccountBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/profile/account" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(AccountBox, response)
  }
}
