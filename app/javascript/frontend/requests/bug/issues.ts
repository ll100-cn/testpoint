import { Issue, IssueInfo, Pagination } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Create = class extends BaseRequest<Issue> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/projects/{project_id}/issues"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Issue, response)
  }
}

export const Get = class extends BaseRequest<Issue> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Issue, response)
  }
}

export const Archive = class extends BaseRequest<Issue> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/archive"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Issue, response)
  }
}

export const Page = class extends BaseRequest<Pagination<Issue>> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/issues"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToPagination(Issue, response)
  }
}

export const Merge = class extends BaseRequest<Issue> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/merge"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Issue, response)
  }
}

export const Unresolve = class extends BaseRequest<Issue> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/unresolve"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Issue, response)
  }
}


export const InfoGet = class extends BaseRequest<IssueInfo> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/issue_infos/{issue_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueInfo, response)
  }
}

export const InfoResolve = class extends BaseRequest<IssueInfo> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/issue_infos/{issue_id}/resolve"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueInfo, response)
  }
}

export const InfoProcess = class extends BaseRequest<IssueInfo> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/issue_infos/{issue_id}/process"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueInfo, response)
  }
}
