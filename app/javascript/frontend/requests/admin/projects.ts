import { type ProjectBox, ProjectBoxImpl, ProjectPage } from "@/models"
import type { AxiosResponse } from "axios"
import { BaseRequest } from "../BaseRequest"

class UpdateRequest extends BaseRequest<ProjectBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/admin/projects", "/{id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(ProjectBoxImpl, response)
  }
}
export const Update = () => new UpdateRequest()


class GetRequest extends BaseRequest<ProjectBox> {
  method = "GET"
  endpoint = [ "/api/v2/admin/projects", "/{project_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(ProjectBoxImpl, response)
  }
}
export const Get = () => new GetRequest()


class DestroyRequest extends BaseRequest<ProjectBox> {
  method = "DELETE"
  endpoint = [ "/api/v2/admin/projects", "/{id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(ProjectBoxImpl, response)
  }
}
export const Destroy = () => new DestroyRequest()


class CreateRequest extends BaseRequest<ProjectBox> {
  method = "POST"
  endpoint = [ "/api/v2/admin/projects" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(ProjectBoxImpl, response)
  }
}
export const Create = () => new CreateRequest()


class PageRequest extends BaseRequest<ProjectPage<ProjectBox>> {
  method = "GET"
  endpoint = [ "/api/v2/admin/projects" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(ProjectPage<ProjectBox>, response)
  }
}
export const Page = () => new PageRequest()
