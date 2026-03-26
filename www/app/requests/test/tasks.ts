import { BaseRequest, Scheme } from "../BaseRequest"
import { TaskBoxSchema, TaskInfoBoxSchema, type TaskBoxType, type TaskInfoBoxType } from '@/schemas/task_upshot'

class IgnoreRequest extends BaseRequest<TaskBoxType> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/plans/{plan_id}/tasks/{task_id}/ignore",
    relatedKeys: [ [ "/plans", "/{plan_id}" ], [ "/tasks", "/{task_id}" ] ]
  })
  schema = TaskBoxSchema
}
export const Ignore = () => new IgnoreRequest()


class UnignoreRequest extends BaseRequest<TaskBoxType> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/plans/{plan_id}/tasks/{task_id}/unignore",
    relatedKeys: [ [ "/plans", "/{plan_id}" ], [ "/tasks", "/{task_id}" ] ]
  })
  schema = TaskBoxSchema
}
export const Unignore = () => new UnignoreRequest()


class GetRequest<T> extends BaseRequest<T> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/plans/{plan_id}", "/tasks/{task_id}" ],
  })
}
export function Get(): GetRequest<TaskBoxType>
export function Get(graph: '+info'): GetRequest<TaskInfoBoxType>
export function Get(graph?: '+info') {
  const request = new GetRequest<TaskBoxType>()
  request.schema = TaskBoxSchema

  if (graph == '+info') {
    request.graph = 'info'
    request.schema = TaskInfoBoxSchema
  }

  return request as GetRequest<TaskBoxType | TaskInfoBoxType>
}
