import { TaskUpshot, TaskUpshotBoxImpl, type TaskUpshotBox } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class UpdateRequest extends BaseRequest<TaskUpshotBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/plans", "/{plan_id}", "/tasks", "/{task_id}", "/upshots", "/{upshot_id}", "/content" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TaskUpshotBoxImpl, response)
  }
}
export const Update = () => new UpdateRequest()
