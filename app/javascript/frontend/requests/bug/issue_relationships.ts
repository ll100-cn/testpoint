import { type IssueRelationshipBox, IssueRelationshipBoxImpl } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class CreateRequest extends BaseRequest<IssueRelationshipBox> {
  method = "POST"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issues", "/{issue_id}", "/issue_relationships" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueRelationshipBoxImpl, response)
  }
}
export const Create = () => new CreateRequest()


class DestroyRequest extends BaseRequest<IssueRelationshipBox> {
  method = "DELETE"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issues", "/{issue_id}", "/issue_relationships", "/{relationship_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueRelationshipBoxImpl, response)
  }
}
export const Destroy = () => new DestroyRequest()
