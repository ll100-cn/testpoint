import { type IssueSurveyBox, IssueSurveyBoxImpl, IssueSurveyPage } from "@/models"
import type { AxiosResponse } from "axios"
import { BaseRequest, Scheme } from "../BaseRequest"

class CreateRequest extends BaseRequest<IssueSurveyBox> {
  scheme = Scheme.post({
    endpoint: "/api/v2/projects/{project_id}/issues/{issue_id}/issue_surveys",
    relatedKeys: [ [ "/issues", "/{issue_id}" ], [ "/issue_surveys" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueSurveyBoxImpl, response)
  }
}
export const Create = () => new CreateRequest()


class DestroyRequest extends BaseRequest<IssueSurveyBox> {
  scheme = Scheme.delete({
    endpoint: "/api/v2/projects/{project_id}/issues/{issue_id}/issue_surveys/{issue_survey_id}",
    relatedKeys: [ [ "/issues", "/{issue_id}" ], [ "/issue_surveys" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueSurveyBoxImpl, response)
  }
}
export const Destroy = () => new DestroyRequest()


class ListRequest extends BaseRequest<IssueSurveyBox[]> {
  scheme = Scheme.get({
    endpoint: [ "/api/v2", "/projects/{project_id}", "/issues/{issue_id}", "/issue_surveys" ],
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueSurveyPage<IssueSurveyBox>, response).list
  }
}
export const List = () => new ListRequest()


class UpdateRequest extends BaseRequest<IssueSurveyBox> {
  scheme = Scheme.patch({
    endpoint: "/api/v2/projects/{project_id}/issues/{issue_id}/issue_surveys/{issue_survey_id}",
    relatedKeys: [ [ "/issues", "/{issue_id}" ], [ "/issue_surveys", "/{issue_survey_id}" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueSurveyBoxImpl, response)
  }
}
export const Update = () => new UpdateRequest()
