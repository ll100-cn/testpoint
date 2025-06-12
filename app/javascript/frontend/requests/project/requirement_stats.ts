import { RequirementStat } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class ListRequest extends BaseRequest<Array<RequirementStat>> {
  method = "GET"
  endpoint = [ "/api/projects", "/{project_id}", "/storyboards", "/{storyboard_id}", "/requirement_stats" ]

  processResponse(response: AxiosResponse) {
    return this.responseToArray(RequirementStat, response)
  }
}
export const List = () => new ListRequest()
