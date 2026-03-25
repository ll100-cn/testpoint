import { Task, type TaskBox, TaskBoxImpl } from "@/models"
import { BaseRequest, Scheme } from "../BaseRequest"
import type { AxiosResponse } from "axios"
import type { Required } from "utility-types"

class IgnoreRequest extends BaseRequest<TaskBox> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/plans/{plan_id}/tasks/{task_id}/ignore",
    relatedKeys: [ [ "/plans", "/{plan_id}" ], [ "/tasks", "/{task_id}" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TaskBoxImpl, response)
  }
}
export const Ignore = () => new IgnoreRequest()


class UnignoreRequest extends BaseRequest<TaskBox> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/plans/{plan_id}/tasks/{task_id}/unignore",
    relatedKeys: [ [ "/plans", "/{plan_id}" ], [ "/tasks", "/{task_id}" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TaskBoxImpl, response)
  }
}
export const Unignore = () => new UnignoreRequest()


class GetRequest<Box extends TaskBox> extends BaseRequest<Box> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/plans/{plan_id}", "/tasks/{task_id}" ],
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TaskBoxImpl, response) as Box
  }
}
export function Get(): InstanceType<typeof GetRequest<TaskBox>>
export function Get(graph: '+info'): InstanceType<typeof GetRequest<Required<TaskBox, 'task_upshots' | 'issues'>>>
export function Get(graph?: string) {
  const request = new GetRequest<TaskBox>()
  request.graph = graph ?? null

  if (graph == '+info') {
    request.graph = 'info'
  }

  return request as any
}