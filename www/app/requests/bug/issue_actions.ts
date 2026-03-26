import { BaseRequest, Scheme } from "../BaseRequest"
import { IssueActionBodySchema, IssueActionBoxSchema, type IssueActionBoxType } from '@/schemas/issue_extra'

class CreateRequest extends BaseRequest<IssueActionBoxType> {
  scheme = Scheme.post({
    endpoint: "/svc/v2/projects/{project_id}/issues/{issue_id}/issue_actions",
    relatedKeys: [ [ "/issues", "/{issue_id}" ], [ "/issue_actions" ] ]
  })

  schema = IssueActionBoxSchema
  bodySchema = IssueActionBodySchema
}
export const Create = () => new CreateRequest()
