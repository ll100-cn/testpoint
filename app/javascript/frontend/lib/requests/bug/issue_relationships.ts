import { IssueRelationship } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Create = class extends BaseRequest<IssueRelationship> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/issue_relationships"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueRelationship, response)
  }
}

export const Destroy = class extends BaseRequest<IssueRelationship> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/issue_relationships/{issue_relationship_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(IssueRelationship, response)
  }
}
