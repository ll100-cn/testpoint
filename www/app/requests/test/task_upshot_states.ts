import { BaseRequest, Scheme } from "../BaseRequest"
import { TaskUpshotBoxSchema, TaskUpshotStateBodySchema, type TaskUpshotBoxType } from '@/schemas/task_upshot'

class UpdateRequest extends BaseRequest<TaskUpshotBoxType> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/plans/{plan_id}/tasks/{task_id}/upshots/{upshot_id}/state",
    relatedKeys: [ [ "/plans", "/{plan_id}" ], [ "/tasks", "/{task_id}" ], [ "/upshots", "/{upshot_id}" ] ]
  })
  schema = TaskUpshotBoxSchema
  bodySchema = TaskUpshotStateBodySchema
}
export const Update = () => new UpdateRequest()
