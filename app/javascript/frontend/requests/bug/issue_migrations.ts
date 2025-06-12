import { Issue } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class CreateRequest extends BaseRequest<void> {
  method = "POST"
  endpoint = [ "/api/projects", "/{project_id}", "/issue_migrations" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Issue, response)
  }
}
export const Create = () => new CreateRequest()
