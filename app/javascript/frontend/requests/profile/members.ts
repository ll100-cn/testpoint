import { MemberInfo } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const InfoList = class extends BaseRequest<Array<MemberInfo>> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/profile/member_infos"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToArray(MemberInfo, response)
  }
}
