import { BaseRequest, Scheme } from "../BaseRequest"
import { TaskUpshotBoxSchema, TaskUpshotContentBodySchema, type TaskUpshotBoxType } from '@/schemas/task_upshot'

class UpdateRequest extends BaseRequest<TaskUpshotBoxType> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/plans/{plan_id}/tasks/{task_id}/upshots/{upshot_id}/content",
    relatedKeys: [ [ "/plans", "/{plan_id}" ], [ "/tasks", "/{task_id}" ], [ "/upshots", "/{upshot_id}" ] ]
  })
  schema = TaskUpshotBoxSchema
  bodySchema = TaskUpshotContentBodySchema
}
export const Update = () => new UpdateRequest()
