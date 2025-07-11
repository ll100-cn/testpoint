import { type IssueBox, IssueBoxImpl, IssuePage } from "@/models"
import { BaseRequest, Scheme } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class PageRequest extends BaseRequest<IssuePage<IssueBox>> {
  scheme = Scheme.get({
    endpoint: [ "/api/v2/profile", "/issues" ],
  })
  graph = "counts"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssuePage<IssueBox>, response)
  }
}
export const Page = () => new PageRequest()
