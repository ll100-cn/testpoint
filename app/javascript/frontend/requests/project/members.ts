import { Member, MemberBox, MemberInfo, MemberPage } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Create = class extends BaseRequest<MemberBox> {
  method = "POST"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/members" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MemberBox, response)
  }
}

export const Get = class extends BaseRequest<MemberBox> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/members", "/{member_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MemberBox, response)
  }
}

export const Update = class extends BaseRequest<MemberBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/members", "/{member_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MemberBox, response)
  }
}

export const Destroy = class extends BaseRequest<MemberBox> {
  method = "DELETE"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/members", "/{member_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MemberBox, response)
  }
}

export const Archive = class extends BaseRequest<MemberBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/members", "/{member_id}", "/archive" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MemberBox, response)
  }
}

export const InfoList = class extends BaseRequest<MemberPage<MemberBox>> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/members" ]
  graph = "info"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MemberPage<MemberBox>, response)
  }
}
