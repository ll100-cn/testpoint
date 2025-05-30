import { MemberBox, MemberPage } from "@/models"
import type { AxiosResponse } from "axios"
import { BaseRequest } from "../BaseRequest"

export const InfoList = class extends BaseRequest<MemberPage<MemberBox>> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/v2/profile/members"
    this.graph = "info"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MemberPage<MemberBox>, response)
  }
}
