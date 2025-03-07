import { RequirementStat } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const List = class extends BaseRequest<Array<RequirementStat>> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/storyboards/{storyboard_id}/requirement_stats"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToArray(RequirementStat, response)
  }
}
