import { IssueRelationship } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class IssueRelationshipDestroy extends BaseObjectRequest<IssueRelationship> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/issue_relationships/{issue_relationship_id}"
    this.klass = IssueRelationship
  }
}
