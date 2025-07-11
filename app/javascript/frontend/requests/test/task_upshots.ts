import { TaskUpshotBoxImpl, TaskUpshotPage, type TaskUpshotBox } from "@/models"
import { BaseRequest, Scheme } from "../BaseRequest"
import type { AxiosResponse } from "axios"
import type { Required } from "utility-types"

class ListRequest<Box extends TaskUpshotBox> extends BaseRequest<TaskUpshotPage<Box>> {
  scheme = Scheme.get({
    endpoint: [ "/api/v2", "/projects/{project_id}", "/plans/{plan_id}", "/phases/{phase_id}", "/task_upshots" ],
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TaskUpshotPage<Box>, response)
  }
}
export function List(): InstanceType<typeof ListRequest<TaskUpshotBox>>
export function List(graph: '+info'): InstanceType<typeof ListRequest<Required<TaskUpshotBox, 'task' | 'test_case'>>>
export function List(graph?: string) {
  const request = new ListRequest<TaskUpshotBox>()
  request.graph = graph ?? null

  if (graph == '+info') {
    request.graph = 'info'
  }

  return request as any
}