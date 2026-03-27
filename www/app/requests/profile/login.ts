import { BaseRequest, Scheme } from "../BaseRequest"
import {
  DeliverLoginBodySchema,
  LoginCodeSchema,
  LogoutResponseSchema,
  VerifyLoginBodySchema,
  VerifyLoginResponseSchema,
  type LoginCodeType,
  type LogoutResponseType,
  type VerifyLoginResponseType,
} from '@/schemas/login'

class DeliverRequest extends BaseRequest<LoginCodeType> {
  scheme = Scheme.post({
    endpoint: "/svc/deliver",
    relatedKeys: []
  })
  schema = LoginCodeSchema
  bodySchema = DeliverLoginBodySchema
}
export const Deliver = () => new DeliverRequest()


class VerifyRequest extends BaseRequest<VerifyLoginResponseType> {
  scheme = Scheme.post({
    endpoint: "/svc/sign_in",
    relatedKeys: []
  })
  schema = VerifyLoginResponseSchema
  bodySchema = VerifyLoginBodySchema
}
export const Verify = () => new VerifyRequest()


class DestroyRequest extends BaseRequest<LogoutResponseType> {
  scheme = Scheme.delete({
    endpoint: "/svc/sign_out",
    relatedKeys: []
  })
  schema = LogoutResponseSchema
}
export const Destroy = () => new DestroyRequest()
