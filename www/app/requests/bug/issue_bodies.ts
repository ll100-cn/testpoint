import { BaseRequest, Scheme } from "../BaseRequest"
import { IssueBodyBodySchema, IssueBodyBoxSchema, type IssueBodyBoxType } from '@/schemas/issue_extra'

class UpdateRequest extends BaseRequest<IssueBodyBoxType> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/issues/{issue_id}/body",
    relatedKeys: [ [ "/issues", "/{issue_id}" ] ]
  })

  schema = IssueBodyBoxSchema
  bodySchema = IssueBodyBodySchema
}
export const Update = () => new UpdateRequest()


class ConvertRequest extends BaseRequest<IssueBodyBoxType> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/issues/{issue_id}/body/convert_comment",
    relatedKeys: [ [ "/issues", "/{issue_id}" ] ]
  })

  schema = IssueBodyBoxSchema
}
export const Convert = () => new ConvertRequest()
