import { BaseRequest, Scheme } from "../BaseRequest"
import { PlatformBodySchema, PlatformBoxSchema, PlatformListSchema, type PlatformBoxType, type PlatformListType } from '@/schemas/platform'

class UpdateRequest extends BaseRequest<PlatformBoxType> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/platforms/{platform_id}",
    relatedKeys: [ [ "/platforms", "/{platform_id}" ] ]
  })

  schema = PlatformBoxSchema
  bodySchema = PlatformBodySchema
}
export const Update = () => new UpdateRequest()


class ListRequest extends BaseRequest<PlatformListType> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/platforms" ],
  })

  schema = PlatformListSchema
}
export const List = () => new ListRequest()


class GetRequest extends BaseRequest<PlatformBoxType> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/platforms/{platform_id}" ],
  })

  schema = PlatformBoxSchema
}
export const Get = () => new GetRequest()


class DestroyRequest extends BaseRequest<PlatformBoxType> {
  scheme = Scheme.delete({
    endpoint: "/svc/v2/projects/{project_id}/platforms/{platform_id}",
    relatedKeys: [ [ "/platforms" ] ]
  })

  schema = PlatformBoxSchema
}
export const Destroy = () => new DestroyRequest()


class CreateRequest extends BaseRequest<PlatformBoxType> {
  scheme = Scheme.post({
    endpoint: "/svc/v2/projects/{project_id}/platforms",
    relatedKeys: [ [ "/platforms" ] ]
  })

  schema = PlatformBoxSchema
  bodySchema = PlatformBodySchema
}
export const Create = () => new CreateRequest()
