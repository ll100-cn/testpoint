import { BaseRequest, Scheme } from "../BaseRequest"
import {
  IssueSurveyBodySchema,
  IssueSurveyBoxSchema,
  IssueSurveyListSchema,
  type IssueSurveyBoxType,
  type IssueSurveyListType,
} from '@/schemas/issue_extra'

class CreateRequest extends BaseRequest<IssueSurveyBoxType> {
  scheme = Scheme.post({
    endpoint: "/svc/v2/projects/{project_id}/issues/{issue_id}/issue_surveys",
    relatedKeys: [ [ "/issues", "/{issue_id}" ], [ "/issue_surveys" ] ]
  })

  schema = IssueSurveyBoxSchema
  bodySchema = IssueSurveyBodySchema
}
export const Create = () => new CreateRequest()


class DestroyRequest extends BaseRequest<IssueSurveyBoxType> {
  scheme = Scheme.delete({
    endpoint: "/svc/v2/projects/{project_id}/issues/{issue_id}/issue_surveys/{issue_survey_id}",
    relatedKeys: [ [ "/issues", "/{issue_id}" ], [ "/issue_surveys" ] ]
  })

  schema = IssueSurveyBoxSchema
}
export const Destroy = () => new DestroyRequest()


class ListRequest extends BaseRequest<IssueSurveyListType> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/issues/{issue_id}", "/issue_surveys" ],
  })

  schema = IssueSurveyListSchema
}
export const List = () => new ListRequest()


class UpdateRequest extends BaseRequest<IssueSurveyBoxType> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/issues/{issue_id}/issue_surveys/{issue_survey_id}",
    relatedKeys: [ [ "/issues", "/{issue_id}" ], [ "/issue_surveys", "/{issue_survey_id}" ] ]
  })

  schema = IssueSurveyBoxSchema
  bodySchema = IssueSurveyBodySchema
}
export const Update = () => new UpdateRequest()
