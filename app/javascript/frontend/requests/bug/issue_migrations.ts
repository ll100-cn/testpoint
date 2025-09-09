import { Issue } from "@/models"
import { BaseRequest, Scheme } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class CreateRequest extends BaseRequest<void> {
  scheme = Scheme.post({
    endpoint: "/svc/v2/projects/{project_id}/issue_migrations",
    relatedKeys: []
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Issue, response)
  }
}
export const Create = () => new CreateRequest()
