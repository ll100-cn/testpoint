import { type ProjectBox, ProjectBoxImpl, ProjectPage } from "@/models"
import type { AxiosResponse } from "axios"
import { BaseRequest, Scheme } from "../BaseRequest"

class UpdateRequest extends BaseRequest<ProjectBox> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/admin/projects/{id}",
    relatedKeys: [ [ "/projects", "/{id}" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(ProjectBoxImpl, response)
  }
}
export const Update = () => new UpdateRequest()


class GetRequest extends BaseRequest<ProjectBox> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2/admin", "/projects/{project_id}" ],
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(ProjectBoxImpl, response)
  }
}
export const Get = () => new GetRequest()


class DestroyRequest extends BaseRequest<ProjectBox> {
  scheme = Scheme.delete({
    endpoint: "/svc/v2/admin/projects/{id}",
    relatedKeys: [ "/projects" ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(ProjectBoxImpl, response)
  }
}
export const Destroy = () => new DestroyRequest()


class CreateRequest extends BaseRequest<ProjectBox> {
  scheme = Scheme.post({
    endpoint: "/svc/v2/admin/projects",
    relatedKeys: [ "/projects" ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(ProjectBoxImpl, response)
  }
}
export const Create = () => new CreateRequest()


class PageRequest extends BaseRequest<ProjectPage<ProjectBox>> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2/admin", "/projects" ],
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(ProjectPage<ProjectBox>, response)
  }
}
export const Page = () => new PageRequest()
