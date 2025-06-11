import { Account, LoginCode } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Deliver = class extends BaseRequest<LoginCode> {
  method = "POST"
  endpoint = [ "/api/deliver" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(LoginCode, response)
  }
}

export const Verify = class extends BaseRequest<LoginCode> {
  method = "POST"
  endpoint = [ "/api/sign_in" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(LoginCode, response)
  }
}

export const Destroy = class extends BaseRequest<Account> {
  method = "DELETE"
  endpoint = [ "/api/sign_out" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Account, response)
  }
}
