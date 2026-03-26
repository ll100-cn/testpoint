import { BaseRequest, Scheme } from "../BaseRequest"
import {
  MemberInfoListSchema,
  MemberListSchema,
  type MemberInfoListType,
  type MemberListType,
} from '@/schemas/member'

class ListRequest<T> extends BaseRequest<T> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2/profile", "/members" ],
  })
}
export function List(): ListRequest<MemberListType>
export function List(graph: '+project'): ListRequest<MemberInfoListType>
export function List(graph: '+info'): ListRequest<MemberInfoListType>
export function List(graph?: '+project' | '+info') {
  const request = new ListRequest<MemberListType>()
  request.schema = MemberListSchema

  if (graph == '+project' || graph == '+info') {
    request.graph = 'info'
    request.schema = MemberInfoListSchema
  }

  return request as ListRequest<MemberListType | MemberInfoListType>
}
