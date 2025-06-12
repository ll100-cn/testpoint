import { TaskUpshotBox, TaskUpshotPage } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class InfoListRequest extends BaseRequest<TaskUpshotPage<TaskUpshotBox>> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/plans", "/{plan_id}", "/phases", "/{phase_id}", "/task_upshots" ]
  graph = "info"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TaskUpshotPage<TaskUpshotBox>, response)
  }
}
export const InfoList = () => new InfoListRequest()
