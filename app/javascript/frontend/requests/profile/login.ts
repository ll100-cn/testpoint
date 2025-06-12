import { Account, LoginCode } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class DeliverRequest extends BaseRequest<LoginCode> {
  method = "POST"
  endpoint = [ "/api/deliver" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(LoginCode, response)
  }
}
export const Deliver = () => new DeliverRequest()


class VerifyRequest extends BaseRequest<LoginCode> {
  method = "POST"
  endpoint = [ "/api/sign_in" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(LoginCode, response)
  }
}
export const Verify = () => new VerifyRequest()


class DestroyRequest extends BaseRequest<Account> {
  method = "DELETE"
  endpoint = [ "/api/sign_out" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Account, response)
  }
}
export const Destroy = () => new DestroyRequest()
