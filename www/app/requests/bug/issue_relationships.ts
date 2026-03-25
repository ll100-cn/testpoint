import { type IssueRelationshipBox, IssueRelationshipBoxImpl } from "@/models"
import { BaseRequest, Scheme } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class CreateRequest extends BaseRequest<IssueRelationshipBox> {
  scheme = Scheme.post({
    endpoint: "/svc/v2/projects/{project_id}/issues/{issue_id}/issue_relationships",
    relatedKeys: [ [ "/issues", "/{issue_id}" ], [ "/issue_relationships" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueRelationshipBoxImpl, response)
  }
}
export const Create = () => new CreateRequest()


class DestroyRequest extends BaseRequest<IssueRelationshipBox> {
  scheme = Scheme.delete({
    endpoint: "/svc/v2/projects/{project_id}/issues/{issue_id}/issue_relationships/{relationship_id}",
    relatedKeys: [ [ "/issues", "/{issue_id}" ], [ "/issue_relationships" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueRelationshipBoxImpl, response)
  }
}
export const Destroy = () => new DestroyRequest()
