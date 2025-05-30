import { ProjectBox, ProjectPage } from "@/models"
import type { AxiosResponse } from "axios"
import { BaseRequest } from "../BaseRequest"

export const Update = class extends BaseRequest<ProjectBox> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/v2/admin/projects/{id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(ProjectBox, response)
  }
}

export const Get = class extends BaseRequest<ProjectBox> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/v2/admin/projects/{project_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(ProjectBox, response)
  }
}

export const Destroy = class extends BaseRequest<ProjectBox> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/v2/admin/projects/{id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(ProjectBox, response)
  }
}

export const Create = class extends BaseRequest<ProjectBox> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/v2/admin/projects"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(ProjectBox, response)
  }
}

export const Page = class extends BaseRequest<ProjectPage<ProjectBox>> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/v2/admin/projects"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(ProjectPage<ProjectBox>, response)
  }
}
