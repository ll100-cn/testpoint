import { IssueRelationship } from "@/models"
import BaseArrayRequest from "./BaseArrayRequest"

export class IssueSourceRelationshipList extends BaseArrayRequest<IssueRelationship> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/source_relationships"
    this.klass = IssueRelationship
  }
}
