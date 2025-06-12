import { IssueBox, IssuePage } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class PageRequest extends BaseRequest<IssuePage<IssueBox>> {
  method = "GET"
  endpoint = [ "/api/v2/profile/issues" ]
  graph = "counts"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssuePage<IssueBox>, response)
  }
}
export const Page = () => new PageRequest()
