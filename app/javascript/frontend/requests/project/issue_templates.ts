import { IssueTemplate, type IssueTemplateBox, IssueTemplateBoxImpl, IssueTemplatePage } from "@/models"
import { BaseRequest, Scheme } from "../BaseRequest"
import type { AxiosResponse, Method } from "axios"

class CreateRequest extends BaseRequest<IssueTemplateBox> {
  scheme = Scheme.post({
    endpoint: "/api/v2/projects/{project_id}/issue_templates",
    relatedKeys: [ [ "/issue_templates" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueTemplateBoxImpl, response)
  }
}
export const Create = () => new CreateRequest()


class GetRequest extends BaseRequest<IssueTemplateBox> {
  scheme = Scheme.get({
    endpoint: [ "/api/v2", "/projects/{project_id}", "/issue_templates/{issue_template_id}" ],
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueTemplateBoxImpl, response)
  }
}
export const Get = () => new GetRequest()


class UpdateRequest extends BaseRequest<IssueTemplateBox> {
  scheme = Scheme.patch({
    endpoint: "/api/v2/projects/{project_id}/issue_templates/{issue_template_id}",
    relatedKeys: [ [ "/issue_templates", "/{issue_template_id}" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueTemplateBoxImpl, response)
  }
}
export const Update = () => new UpdateRequest()


class DestroyRequest extends BaseRequest<IssueTemplateBox> {
  scheme = Scheme.delete({
    endpoint: "/api/v2/projects/{project_id}/issue_templates/{issue_template_id}",
    relatedKeys: [ [ "/issue_templates" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueTemplateBoxImpl, response)
  }
}
export const Destroy = () => new DestroyRequest()


class ListRequest extends BaseRequest<IssueTemplateBox[]> {
  scheme = Scheme.get({
    endpoint: [ "/api/v2", "/projects/{project_id}", "/issue_templates" ],
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueTemplatePage<IssueTemplateBox>, response).list
  }
}
export const List = () => new ListRequest()
