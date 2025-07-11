import { TaskUpshot, TaskUpshotBoxImpl, type TaskUpshotBox } from "@/models"
import { BaseRequest, Scheme } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class UpdateRequest extends BaseRequest<TaskUpshotBox> {
  scheme = Scheme.patch({
    endpoint: "/api/v2/projects/{project_id}/plans/{plan_id}/tasks/{task_id}/upshots/{upshot_id}/content",
    relatedKeys: [ [ "/plans", "/{plan_id}" ], [ "/tasks", "/{task_id}" ], [ "/upshots", "/{upshot_id}" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TaskUpshotBoxImpl, response)
  }
}
export const Update = () => new UpdateRequest()
