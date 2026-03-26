import { BaseRequest, Scheme } from "../BaseRequest"
import { AccountBodySchema, AccountBoxSchema, type AccountBoxType } from "@/schemas/account"

class GetRequest extends BaseRequest<AccountBoxType> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2/profile", "/account" ],
  })
  schema = AccountBoxSchema
}
export const Get = () => new GetRequest()


class UpdateRequest extends BaseRequest<AccountBoxType> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/profile/account",
    relatedKeys: [ "/account" ]
  })
  schema = AccountBoxSchema
  bodySchema = AccountBodySchema
}
export const Update = () => new UpdateRequest()
