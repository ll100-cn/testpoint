import { Member, type MemberBox, MemberBoxImpl, MemberInfo, MemberPage } from "@/models"
import { BaseRequest, Scheme } from "../BaseRequest"
import type { AxiosResponse } from "axios"
import { type Required } from 'utility-types'

class CreateRequest extends BaseRequest<MemberBox> {
  scheme = Scheme.post({
    endpoint: "/api/v2/projects/{project_id}/members",
    relatedKeys: [ [ "/projects", "/{project_id}" ], [ "/members" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MemberBoxImpl, response)
  }
}
export const Create = () => new CreateRequest()


class GetRequest extends BaseRequest<MemberBox> {
  scheme = Scheme.get({
    endpoint: [ "/api/v2", "/projects/{project_id}", "/members/{member_id}" ],
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MemberBoxImpl, response)
  }
}
export const Get = () => new GetRequest()


class UpdateRequest extends BaseRequest<MemberBox> {
  scheme = Scheme.patch({
    endpoint: "/api/v2/projects/{project_id}/members/{member_id}",
    relatedKeys: [ [ "/members", "/{member_id}" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MemberBoxImpl, response)
  }
}
export const Update = () => new UpdateRequest()


class DestroyRequest extends BaseRequest<MemberBox> {
  scheme = Scheme.delete({
    endpoint: "/api/v2/projects/{project_id}/members/{member_id}",
    relatedKeys: [ [ "/members" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MemberBoxImpl, response)
  }
}
export const Destroy = () => new DestroyRequest()


class ArchiveRequest extends BaseRequest<MemberBox> {
  scheme = Scheme.patch({
    endpoint: "/api/v2/projects/{project_id}/members/{member_id}/archive",
    relatedKeys: [ [ "/members", "/{member_id}" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MemberBoxImpl, response)
  }
}
export const Archive = () => new ArchiveRequest()


class ListRequest<Box extends MemberBox> extends BaseRequest<Box[]> {
  scheme = Scheme.get({
    endpoint: [ "/api/v2", "/projects/{project_id}", "/members" ],
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MemberPage<Box>, response).list
  }
}
export function List(): InstanceType<typeof ListRequest<MemberBox>>
export function List(graph: '+user'): InstanceType<typeof ListRequest<Required<MemberBox, 'user'>>>
export function List(graph: '+project'): InstanceType<typeof ListRequest<Required<MemberBox, 'project'>>>
export function List(graph?: string) {
  const request = new ListRequest<MemberBox>()
  request.graph = graph ?? null

  if (graph == '+user') {
    request.graph = 'info'
  }

  if (graph == '+project') {
    request.graph = 'info'
  }

  return request as any
}