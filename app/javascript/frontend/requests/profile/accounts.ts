import { Account, type AccountBox, AccountBoxImpl } from "@/models"
import { BaseRequest, Scheme } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class GetRequest extends BaseRequest<AccountBox> {
  scheme = Scheme.get({
    endpoint: [ "/api/v2/profile", "/account" ],
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(AccountBoxImpl, response)
  }
}
export const Get = () => new GetRequest()


class UpdateRequest extends BaseRequest<AccountBox> {
  scheme = Scheme.patch({
    endpoint: "/api/v2/profile/account",
    relatedKeys: [ "/account" ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(AccountBoxImpl, response)
  }
}
export const Update = () => new UpdateRequest()
