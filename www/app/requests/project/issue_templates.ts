import { BaseRequest, Scheme } from "../BaseRequest"
import {
  IssueTemplateBodySchema,
  IssueTemplateBoxSchema,
  IssueTemplateListSchema,
  type IssueTemplateBoxType,
  type IssueTemplateListType,
} from '@/schemas/issue_extra'

class CreateRequest extends BaseRequest<IssueTemplateBoxType> {
  scheme = Scheme.post({
    endpoint: "/svc/v2/projects/{project_id}/issue_templates",
    relatedKeys: [ [ "/issue_templates" ] ]
  })

  schema = IssueTemplateBoxSchema
  bodySchema = IssueTemplateBodySchema
}
export const Create = () => new CreateRequest()


class GetRequest extends BaseRequest<IssueTemplateBoxType> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/issue_templates/{issue_template_id}" ],
  })

  schema = IssueTemplateBoxSchema
}
export const Get = () => new GetRequest()


class UpdateRequest extends BaseRequest<IssueTemplateBoxType> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/issue_templates/{issue_template_id}",
    relatedKeys: [ [ "/issue_templates", "/{issue_template_id}" ] ]
  })

  schema = IssueTemplateBoxSchema
  bodySchema = IssueTemplateBodySchema
}
export const Update = () => new UpdateRequest()


class DestroyRequest extends BaseRequest<IssueTemplateBoxType> {
  scheme = Scheme.delete({
    endpoint: "/svc/v2/projects/{project_id}/issue_templates/{issue_template_id}",
    relatedKeys: [ [ "/issue_templates" ] ]
  })

  schema = IssueTemplateBoxSchema
}
export const Destroy = () => new DestroyRequest()


class ListRequest extends BaseRequest<IssueTemplateListType> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/issue_templates" ],
  })

  schema = IssueTemplateListSchema
}
export const List = () => new ListRequest()
