import { BaseRequest, Scheme } from "../BaseRequest"
import {
  TaskUpshotInfoBoxSchema,
  TaskUpshotPageSchema,
  TaskUpshotBoxSchema,
  type TaskUpshotInfoBoxType,
  type TaskUpshotPageType,
  type TaskUpshotBoxType,
} from '@/schemas/task_upshot'

class ListRequest<T> extends BaseRequest<T> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/plans/{plan_id}", "/phases/{phase_id}", "/task_upshots" ],
  })
}
export function List(): ListRequest<TaskUpshotPageType>
export function List(graph: '+info'): ListRequest<TaskUpshotPageType>
export function List(graph?: '+info') {
  const request = new ListRequest<TaskUpshotPageType>()
  request.schema = TaskUpshotPageSchema

  if (graph == '+info') {
    request.graph = 'info'
    request.schema = TaskUpshotPageSchema
  }

  return request
}
