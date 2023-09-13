import { IssueRelationship } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class IssueRelationshipCreate extends BaseObjectRequest<IssueRelationship> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/issue_relationships"
    this.klass = IssueRelationship
  }
}
