import { IssueRelationship } from "@/models"
import BaseArrayRequest from "./BaseArrayRequest"

export class IssueTargetRelationshipList extends BaseArrayRequest<IssueRelationship> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/target_relationships"
    this.klass = IssueRelationship
  }
}
