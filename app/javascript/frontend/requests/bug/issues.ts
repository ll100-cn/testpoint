import { Issue, type IssueBox, IssueBoxImpl, IssuePage, IssueSummary } from "@/models"
import { BaseRequest, Scheme } from "../BaseRequest"
import type { AxiosResponse } from "axios"
import type { Required } from "utility-types"

type IssueBoxInfoFields = 'activities' | 'attachments' | 'source_relationships' | 'subscriptions' | 'surveys' | 'target_relationships'

class CreateRequest extends BaseRequest<IssueBox> {
  scheme = Scheme.post({
    endpoint: "/api/v2/projects/{project_id}/issues",
    relatedKeys: [ [ "/issues" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueBoxImpl, response)
  }
}
export const Create = () => new CreateRequest()


class PageRequest extends BaseRequest<IssuePage<IssueBox>> {
  scheme = Scheme.get({
    endpoint: [ "/api/v2", "/projects/{project_id}", "/issues" ],
  })
  graph = "counts"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssuePage, response)
  }
}
export const Page = () => new PageRequest()


class MergeRequest extends BaseRequest<IssueBox> {
  scheme = Scheme.post({
    endpoint: "/api/v2/projects/{project_id}/issues/{issue_id}/merge",
    relatedKeys: [ [ "/issues", "/{issue_id}" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueBoxImpl, response)
  }
}
export const Merge = () => new MergeRequest()


class GetRequest<Box extends IssueBox> extends BaseRequest<Box> {
  scheme = Scheme.get({
    endpoint: [ "/api/v2", "/projects/{project_id}", "/issues/{issue_id}" ],
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueBoxImpl, response) as Box
  }
}
export function Get(): InstanceType<typeof GetRequest<IssueBox>>
export function Get(graph: '+info'): InstanceType<typeof GetRequest<Required<IssueBox, IssueBoxInfoFields>>>
export function Get(graph?: string) {
  const request = new GetRequest<IssueBox>()
  request.graph = graph ?? null

  if (graph == '+info') {
    request.graph = 'info'
  }

  return request as any
}


class ResolveRequest<Box extends IssueBox> extends BaseRequest<Box> {
  scheme = Scheme.patch({
    endpoint: "/api/v2/projects/{project_id}/issues/{issue_id}/resolve",
    relatedKeys: [ [ "/issues", "/{issue_id}" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueBoxImpl, response) as Box
  }
}
export function Resolve(): InstanceType<typeof GetRequest<IssueBox>>
export function Resolve(graph: '+info'): InstanceType<typeof GetRequest<Required<IssueBox, IssueBoxInfoFields>>>
export function Resolve(graph?: string) {
  const request = new ResolveRequest<IssueBox>()
  request.graph = graph ?? null

  if (graph == '+info') {
    request.graph = 'info'
  }

  return request as any
}


class ProcessRequest<Box extends IssueBox> extends BaseRequest<Box> {
  scheme = Scheme.patch({
    endpoint: "/api/v2/projects/{project_id}/issues/{issue_id}/process",
    relatedKeys: [ [ "/projects", "/{project_id}", "/issues", "/{issue_id}" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueBoxImpl, response) as Box
  }
}
export function Process(): InstanceType<typeof ProcessRequest<IssueBox>>
export function Process(graph: '+info'): InstanceType<typeof ProcessRequest<Required<IssueBox, IssueBoxInfoFields>>>
export function Process(graph?: string) {
  const request = new ProcessRequest<IssueBox>()
  request.graph = graph ?? null

  if (graph == '+info') {
    request.graph = 'info'
  }

  return request as any
}


class SummaryRequest extends BaseRequest<IssueSummary> {
  scheme = Scheme.get({
    endpoint: [ "/api/v2", "/projects/{project_id}", "/issues", "/summary" ],
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueSummary, response)
  }
}
export const Summary = () => new SummaryRequest()
