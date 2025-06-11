import { IssueTemplate, IssueTemplateBox, IssueTemplatePage } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse, Method } from "axios"

export const Create = class extends BaseRequest<IssueTemplateBox> {
  method = "POST"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issue_templates" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueTemplateBox, response)
  }
}

export const Get = class extends BaseRequest<IssueTemplateBox> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issue_templates", "/{issue_template_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueTemplateBox, response)
  }
}

export const Update = class extends BaseRequest<IssueTemplateBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issue_templates", "/{issue_template_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueTemplateBox, response)
  }
}

export const Destroy = class extends BaseRequest<IssueTemplateBox> {
  method = "DELETE"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issue_templates", "/{issue_template_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueTemplateBox, response)
  }
}

export const List = class extends BaseRequest<IssueTemplatePage<IssueTemplateBox>> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issue_templates" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueTemplatePage<IssueTemplateBox>, response)
  }
}
