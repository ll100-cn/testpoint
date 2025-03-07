import { IssueTemplate } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse, Method } from "axios"

export const Create = class extends BaseRequest<IssueTemplate> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/projects/{project_id}/issue_templates"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueTemplate, response)
  }
}

export const Get = class extends BaseRequest<IssueTemplate> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/issue_templates/{issue_template_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueTemplate, response)
  }
}

export const Update = class extends BaseRequest<IssueTemplate> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/issue_templates/{issue_template_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueTemplate, response)
  }
}

export const Destroy = class extends BaseRequest<IssueTemplate> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/projects/{project_id}/issue_templates/{issue_template_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueTemplate, response)
  }
}

export const List = class extends BaseRequest<Array<IssueTemplate>> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/issue_templates"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToArray(IssueTemplate, response)
  }
}
