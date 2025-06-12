import { Issue, IssueBox, IssuePage, IssueSummary, Pagination } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class CreateRequest extends BaseRequest<IssueBox> {
  method = "POST"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issues" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueBox, response)
  }
}
export const Create = () => new CreateRequest()


class GetRequest extends BaseRequest<IssueBox> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issues", "/{issue_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueBox, response)
  }
}
export const Get = () => new GetRequest()


class PageRequest extends BaseRequest<IssuePage<IssueBox>> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issues" ]
  graph = "counts"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssuePage, response)
  }
}
export const Page = () => new PageRequest()


class MergeRequest extends BaseRequest<IssueBox> {
  method = "POST"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issues", "/{issue_id}", "/merge" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueBox, response)
  }
}
export const Merge = () => new MergeRequest()


class InfoGetRequest extends BaseRequest<IssueBox> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issues", "/{issue_id}" ]
  graph = "info"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueBox, response)
  }
}
export const InfoGet = () => new InfoGetRequest()


class InfoResolveRequest extends BaseRequest<IssueBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issues", "/{issue_id}", "/resolve" ]
  graph = "info"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueBox, response)
  }
}
export const InfoResolve = () => new InfoResolveRequest()


class InfoProcessRequest extends BaseRequest<IssueBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issues", "/{issue_id}", "/process" ]
  graph = "info"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueBox, response)
  }
}
export const InfoProcess = () => new InfoProcessRequest()


class SummaryRequest extends BaseRequest<IssueSummary> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issues", "/summary" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueSummary, response)
  }
}
export const Summary = () => new SummaryRequest()
