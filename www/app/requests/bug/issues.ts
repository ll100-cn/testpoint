import { BaseRequest, Scheme } from "../BaseRequest"
import {
  IssueBoxSchema,
  IssueCreateBodySchema,
  IssueInfoBoxSchema,
  IssueMergeBodySchema,
  IssuePageWithCountsSchema,
  IssueProcessBodySchema,
  IssueResolveBodySchema,
  IssueSummarySchema,
  type IssueBoxType,
  type IssueInfoBoxType,
  type IssuePageWithCountsType,
  type IssueSummaryType,
} from '@/schemas/issue'

class CreateRequest extends BaseRequest<IssueBoxType> {
  scheme = Scheme.post({
    endpoint: "/svc/v2/projects/{project_id}/issues",
    relatedKeys: [ "/issues" ]
  })
  schema = IssueBoxSchema
  bodySchema = IssueCreateBodySchema
}
export const Create = () => new CreateRequest()


class PageRequest extends BaseRequest<IssuePageWithCountsType> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/issues" ],
  })
  graph = "counts"
  schema = IssuePageWithCountsSchema
}
export const Page = () => new PageRequest()


class MergeRequest extends BaseRequest<IssueBoxType> {
  scheme = Scheme.post({
    endpoint: "/svc/v2/projects/{project_id}/issues/{issue_id}/merge",
    relatedKeys: [ [ "/issues", "/{issue_id}" ], "/issues" ]
  })
  schema = IssueBoxSchema
  bodySchema = IssueMergeBodySchema
}
export const Merge = () => new MergeRequest()


class GetRequest<T> extends BaseRequest<T> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/issues/{issue_id}" ],
  })
}
export function Get(): GetRequest<IssueBoxType>
export function Get(graph: '+info'): GetRequest<IssueInfoBoxType>
export function Get(graph?: '+info') {
  const request = new GetRequest<IssueBoxType>()
  request.schema = IssueBoxSchema

  if (graph == '+info') {
    request.graph = 'info'
    request.schema = IssueInfoBoxSchema
  }

  return request as GetRequest<IssueBoxType | IssueInfoBoxType>
}


class ResolveRequest<T> extends BaseRequest<T> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/issues/{issue_id}/resolve",
    relatedKeys: [ [ "/issues", "/{issue_id}" ], "/issues" ]
  })
}
export function Resolve(): ResolveRequest<IssueBoxType>
export function Resolve(graph: '+info'): ResolveRequest<IssueInfoBoxType>
export function Resolve(graph?: '+info') {
  const request = new ResolveRequest<IssueBoxType>()
  request.schema = IssueBoxSchema
  request.bodySchema = IssueResolveBodySchema

  if (graph == '+info') {
    request.graph = 'info'
    request.schema = IssueInfoBoxSchema
  }

  return request as ResolveRequest<IssueBoxType | IssueInfoBoxType>
}


class ProcessRequest<T> extends BaseRequest<T> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/issues/{issue_id}/process",
    relatedKeys: [ [ "/issues", "/{issue_id}" ], "/issues" ]
  })
}
export function Process(): ProcessRequest<IssueBoxType>
export function Process(graph: '+info'): ProcessRequest<IssueInfoBoxType>
export function Process(graph?: '+info') {
  const request = new ProcessRequest<IssueBoxType>()
  request.schema = IssueBoxSchema
  request.bodySchema = IssueProcessBodySchema

  if (graph == '+info') {
    request.graph = 'info'
    request.schema = IssueInfoBoxSchema
  }

  return request as ProcessRequest<IssueBoxType | IssueInfoBoxType>
}


class SummaryRequest extends BaseRequest<IssueSummaryType> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/issues", "/summary" ],
  })
  schema = IssueSummarySchema
}
export const Summary = () => new SummaryRequest()
