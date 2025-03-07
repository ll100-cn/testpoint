import { IssueSurvey } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Create = class extends BaseRequest<IssueSurvey> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/issue_surveys"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueSurvey, response)
  }
}

export const Destroy = class extends BaseRequest<IssueSurvey> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/issue_surveys/{issue_survey_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueSurvey, response)
  }
}

export const List = class extends BaseRequest<Array<IssueSurvey>> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/issue_surveys"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToArray(IssueSurvey, response)
  }
}

export const Update = class extends BaseRequest<IssueSurvey> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/issue_surveys/{issue_survey_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueSurvey, response)
  }
}
