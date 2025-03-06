import { Member, MemberInfo } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Create = class extends BaseRequest<Member> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/projects/{project_id}/members"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Member, response)
  }
}

export const Get = class extends BaseRequest<Member> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/members/{member_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Member, response)
  }
}

export const Update = class extends BaseRequest<Member> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/members/{member_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Member, response)
  }
}

export const Destroy = class extends BaseRequest<Member> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/projects/{project_id}/members/{member_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Member, response)
  }
}

export const Archive = class extends BaseRequest<Member> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/members/{member_id}/archive"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Member, response)
  }
}

export const InfoList = class extends BaseRequest<Array<MemberInfo>> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/member_infos"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToArray(MemberInfo, response)
  }
}
