import { Pagination, Project } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Update = class extends BaseRequest<Project> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/admin/projects/{id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Project, response)
  }
}

export const Get = class extends BaseRequest<Project> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/admin/projects/{project_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Project, response)
  }
}

export const Destroy = class extends BaseRequest<Project> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/admin/projects/{id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Project, response)
  }
}

export const Create = class extends BaseRequest<Project> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/admin/projects"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Project, response)
  }
}

export const Page = class extends BaseRequest<Pagination<Project>> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/admin/projects"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToPagination(Project, response)
  }
}
