import { IssueTemplate, IssueTemplateBox, IssueTemplatePage } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse, Method } from "axios"

class CreateRequest extends BaseRequest<IssueTemplateBox> {
  method = "POST"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issue_templates" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueTemplateBox, response)
  }
}
export const Create = () => new CreateRequest()


class GetRequest extends BaseRequest<IssueTemplateBox> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issue_templates", "/{issue_template_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueTemplateBox, response)
  }
}
export const Get = () => new GetRequest()


class UpdateRequest extends BaseRequest<IssueTemplateBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issue_templates", "/{issue_template_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueTemplateBox, response)
  }
}
export const Update = () => new UpdateRequest()


class DestroyRequest extends BaseRequest<IssueTemplateBox> {
  method = "DELETE"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issue_templates", "/{issue_template_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueTemplateBox, response)
  }
}
export const Destroy = () => new DestroyRequest()


class ListRequest extends BaseRequest<IssueTemplateBox[]> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issue_templates" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueTemplatePage<IssueTemplateBox>, response).list
  }
}
export const List = () => new ListRequest()
