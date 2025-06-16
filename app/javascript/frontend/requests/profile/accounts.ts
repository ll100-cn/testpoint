import { Account, type AccountBox, AccountBoxImpl } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class GetRequest extends BaseRequest<AccountBox> {
  method = "GET"
  endpoint = [ "/api/v2/profile/account" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(AccountBoxImpl, response)
  }
}
export const Get = () => new GetRequest()


class UpdateRequest extends BaseRequest<AccountBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/profile/account" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(AccountBoxImpl, response)
  }
}
export const Update = () => new UpdateRequest()
