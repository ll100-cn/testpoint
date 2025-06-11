import { MemberBox, MemberPage } from "@/models"
import type { AxiosResponse } from "axios"
import { BaseRequest } from "../BaseRequest"

export const InfoList = class extends BaseRequest<MemberPage<MemberBox>> {
  method = "GET"
  endpoint = [ "/api/v2/profile/members" ]
  graph = "info"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MemberPage<MemberBox>, response)
  }
}
