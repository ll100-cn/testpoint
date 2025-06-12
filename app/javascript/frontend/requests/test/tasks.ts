import { Task, TaskBox } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class IgnoreRequest extends BaseRequest<TaskBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/plans", "/{plan_id}", "/tasks", "/{id}", "/ignore" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TaskBox, response)
  }
}
export const Ignore = () => new IgnoreRequest()


class UnignoreRequest extends BaseRequest<TaskBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/plans", "/{plan_id}", "/tasks", "/{id}", "/unignore" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TaskBox, response)
  }
}
export const Unignore = () => new UnignoreRequest()


class InfoGetRequest extends BaseRequest<TaskBox> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/plans", "/{plan_id}", "/tasks", "/{task_id}" ]
  graph = "info"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TaskBox, response)
  }
}
export const InfoGet = () => new InfoGetRequest()
