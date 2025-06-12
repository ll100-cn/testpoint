import { IssueStat } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class ListRequest extends BaseRequest<Array<IssueStat>> {
  method = "GET"
  endpoint = [ "/api/profile/issue_stats" ]

  processResponse(response: AxiosResponse) {
    return this.responseToArray(IssueStat, response)
  }
}
export const List = () => new ListRequest()
