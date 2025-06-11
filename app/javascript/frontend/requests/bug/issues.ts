import { Issue, IssueBox, IssuePage, IssueSummary, Pagination } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Create = class extends BaseRequest<IssueBox> {
  method = "POST"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issues" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueBox, response)
  }
}

export const Get = class extends BaseRequest<IssueBox> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issues", "/{issue_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueBox, response)
  }
}

export const Page = class extends BaseRequest<IssuePage<IssueBox>> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issues" ]
  graph = "counts"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssuePage, response)
  }
}

export const Merge = class extends BaseRequest<IssueBox> {
  method = "POST"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issues", "/{issue_id}", "/merge" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueBox, response)
  }
}

export const InfoGet = class extends BaseRequest<IssueBox> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issues", "/{issue_id}" ]
  graph = "info"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueBox, response)
  }
}

export const InfoResolve = class extends BaseRequest<IssueBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issues", "/{issue_id}", "/resolve" ]
  graph = "info"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueBox, response)
  }
}

export const InfoProcess = class extends BaseRequest<IssueBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issues", "/{issue_id}", "/process" ]
  graph = "info"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueBox, response)
  }
}

export const Summary = class extends BaseRequest<IssueSummary> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issues", "/summary" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueSummary, response)
  }
}
