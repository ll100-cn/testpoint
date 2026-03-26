import { BaseRequest, Scheme } from "../BaseRequest"
import { ProfileBodySchema, ProfileBoxSchema, type ProfileBoxType } from '@/schemas/profile'

class GetRequest extends BaseRequest<ProfileBoxType> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/profile" ],
  })
  schema = ProfileBoxSchema
}
export const Get = () => new GetRequest()


class UpdateRequest extends BaseRequest<ProfileBoxType> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/profile",
    relatedKeys: [ [ "/projects", "/{project_id}" ], [ "/profile" ] ]
  })
  schema = ProfileBoxSchema
  bodySchema = ProfileBodySchema
}
export const Update = () => new UpdateRequest()
