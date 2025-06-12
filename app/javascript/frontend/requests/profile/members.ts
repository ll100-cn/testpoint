import { MemberBox, MemberPage } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class InfoListRequest extends BaseRequest<MemberPage<MemberBox>> {
  method = "GET"
  endpoint = [ "/api/v2/profile/members" ]
  graph = "info"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MemberPage<MemberBox>, response)
  }
}
export const InfoList = () => new InfoListRequest()
