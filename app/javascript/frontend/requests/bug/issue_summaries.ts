import { IssueSummaryBox } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Get = class extends BaseRequest<IssueSummaryBox> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issue_summaries" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueSummaryBox, response)
  }
}
