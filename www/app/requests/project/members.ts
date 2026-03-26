import { BaseRequest, Scheme } from "../BaseRequest"
import {
  MemberBodySchema,
  MemberBoxSchema,
  MemberInfoListSchema,
  MemberListSchema,
  type MemberBoxType,
  type MemberInfoListType,
  type MemberListType,
} from '@/schemas/member'

class CreateRequest extends BaseRequest<MemberBoxType> {
  scheme = Scheme.post({
    endpoint: "/svc/v2/projects/{project_id}/members",
    relatedKeys: [ [ "/projects", "/{project_id}" ], [ "/members" ] ]
  })
  schema = MemberBoxSchema
  bodySchema = MemberBodySchema
}
export const Create = () => new CreateRequest()


class GetRequest extends BaseRequest<MemberBoxType> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/members/{member_id}" ],
  })
  schema = MemberBoxSchema
}
export const Get = () => new GetRequest()


class UpdateRequest extends BaseRequest<MemberBoxType> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/members/{member_id}",
    relatedKeys: [ [ "/members", "/{member_id}" ] ]
  })
  schema = MemberBoxSchema
  bodySchema = MemberBodySchema
}
export const Update = () => new UpdateRequest()


class DestroyRequest extends BaseRequest<MemberBoxType> {
  scheme = Scheme.delete({
    endpoint: "/svc/v2/projects/{project_id}/members/{member_id}",
    relatedKeys: [ [ "/members" ] ]
  })
  schema = MemberBoxSchema
}
export const Destroy = () => new DestroyRequest()


class ArchiveRequest extends BaseRequest<MemberBoxType> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/members/{member_id}/archive",
    relatedKeys: [ [ "/members", "/{member_id}" ] ]
  })
  schema = MemberBoxSchema
}
export const Archive = () => new ArchiveRequest()


class ListRequest<T> extends BaseRequest<T> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/members" ],
  })
}
export function List(): ListRequest<MemberListType>
export function List(graph: '+user'): ListRequest<MemberInfoListType>
export function List(graph: '+project'): ListRequest<MemberInfoListType>
export function List(graph: '+info'): ListRequest<MemberInfoListType>
export function List(graph?: '+user' | '+project' | '+info') {
  const request = new ListRequest<MemberListType>()
  request.schema = MemberListSchema

  if (graph == '+user' || graph == '+project' || graph == '+info') {
    request.graph = 'info'
    request.schema = MemberInfoListSchema
  }

  return request as ListRequest<MemberListType | MemberInfoListType>
}
