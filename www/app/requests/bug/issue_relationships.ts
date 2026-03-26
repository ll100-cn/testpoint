import { BaseRequest, Scheme } from "../BaseRequest"
import {
  IssueRelationshipBodySchema,
  IssueRelationshipBoxSchema,
  type IssueRelationshipBoxType,
} from '@/schemas/issue_extra'

class CreateRequest extends BaseRequest<IssueRelationshipBoxType> {
  scheme = Scheme.post({
    endpoint: "/svc/v2/projects/{project_id}/issues/{issue_id}/issue_relationships",
    relatedKeys: [ [ "/issues", "/{issue_id}" ], [ "/issue_relationships" ] ]
  })

  schema = IssueRelationshipBoxSchema
  bodySchema = IssueRelationshipBodySchema
}
export const Create = () => new CreateRequest()


class DestroyRequest extends BaseRequest<IssueRelationshipBoxType> {
  scheme = Scheme.delete({
    endpoint: "/svc/v2/projects/{project_id}/issues/{issue_id}/issue_relationships/{relationship_id}",
    relatedKeys: [ [ "/issues", "/{issue_id}" ], [ "/issue_relationships" ] ]
  })

  schema = IssueRelationshipBoxSchema
}
export const Destroy = () => new DestroyRequest()
