import { type MemberBox, MemberPage } from "@/models"
import type { AxiosResponse } from "axios"
import type { Required } from "utility-types"
import { BaseRequest, Scheme } from "../BaseRequest"

class ListRequest<Box extends MemberBox> extends BaseRequest<Box[]> {
  scheme = Scheme.get({
    endpoint: [ "/api/v2/profile", "/members" ],
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MemberPage<Box>, response).list
  }
}
export function List(): InstanceType<typeof ListRequest<MemberBox>>
export function List(graph: '+project'): InstanceType<typeof ListRequest<Required<MemberBox, 'project'>>>
export function List(graph?: string) {
  const request = new ListRequest<MemberBox>()
  request.graph = graph ?? null

  if (graph == '+project') {
    request.graph = 'info'
  }

  return request as any
}
