import { BaseRequest, Scheme } from "../BaseRequest"
import { UserBodySchema, UserBoxSchema, UserPageSchema, type UserBoxType, type UserPageType } from "@/schemas/user"

class UpdateRequest extends BaseRequest<UserBoxType> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/admin/users/{id}",
    relatedKeys: [ [ "/users", "/{id}" ], "/users" ]
  })
  schema = UserBoxSchema
  bodySchema = UserBodySchema
}
export const Update = () => new UpdateRequest()


class GetRequest extends BaseRequest<UserBoxType> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2/admin", "/users/{id}" ],
  })
  schema = UserBoxSchema
}
export const Get = () => new GetRequest()


class DestroyRequest extends BaseRequest<UserBoxType> {
  scheme = Scheme.delete({
    endpoint: "/svc/v2/admin/users/{id}",
    relatedKeys: [ "/users" ]
  })
  schema = UserBoxSchema
}
export const Destroy = () => new DestroyRequest()


class CreateRequest extends BaseRequest<UserBoxType> {
  scheme = Scheme.post({
    endpoint: "/svc/v2/admin/users",
    relatedKeys: [ "/users" ]
  })
  schema = UserBoxSchema
  bodySchema = UserBodySchema
}
export const Create = () => new CreateRequest()


class PageRequest extends BaseRequest<UserPageType> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2/admin", "/users" ],
  })
  schema = UserPageSchema
}
export const Page = () => new PageRequest()
