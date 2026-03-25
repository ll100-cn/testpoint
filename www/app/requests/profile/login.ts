import { Account, LoginCode } from "@/models"
import { BaseRequest, Scheme } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class DeliverRequest extends BaseRequest<LoginCode> {
  scheme = Scheme.post({
    endpoint: "/svc/deliver",
    relatedKeys: []
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(LoginCode, response)
  }
}
export const Deliver = () => new DeliverRequest()


class VerifyRequest extends BaseRequest<LoginCode> {
  scheme = Scheme.post({
    endpoint: "/svc/sign_in",
    relatedKeys: []
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(LoginCode, response)
  }
}
export const Verify = () => new VerifyRequest()


class DestroyRequest extends BaseRequest<Account> {
  scheme = Scheme.delete({
    endpoint: "/svc/sign_out",
    relatedKeys: []
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Account, response)
  }
}
export const Destroy = () => new DestroyRequest()
