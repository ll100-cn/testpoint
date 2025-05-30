import { Issue, IssueBox, IssuePage, Pagination } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Create = class extends BaseRequest<IssueBox> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/v2/projects/{project_id}/issues"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueBox, response)
  }
}

export const Get = class extends BaseRequest<IssueBox> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/v2/projects/{project_id}/issues/{issue_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueBox, response)
  }
}

export const Page = class extends BaseRequest<IssuePage<IssueBox>> {
  method = "GET"
  endpoint = "/api/v2/projects/{project_id}/issues"
  graph = "counts"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssuePage, response)
  }
}

export const Merge = class extends BaseRequest<IssueBox> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/v2/projects/{project_id}/issues/{issue_id}/merge"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueBox, response)
  }
}

export const InfoGet = class extends BaseRequest<IssueBox> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/v2/projects/{project_id}/issues/{issue_id}"
    this.graph = "info"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueBox, response)
  }
}

export const InfoResolve = class extends BaseRequest<IssueBox> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/v2/projects/{project_id}/issues/{issue_id}/resolve"
    this.graph = "info"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueBox, response)
  }
}

export const InfoProcess = class extends BaseRequest<IssueBox> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/v2/projects/{project_id}/issues/{issue_id}/process"
    this.graph = "info"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueBox, response)
  }
}
