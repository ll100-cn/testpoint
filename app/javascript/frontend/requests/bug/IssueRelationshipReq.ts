import { IssueRelationship } from "@/models"
import BaseObjectRequest from "../BaseObjectRequest"

export default {
  Create: class extends BaseObjectRequest<IssueRelationship> {
    constructor() {
      super()
      this.method = "POST"
      this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/issue_relationships"
      this.klass = IssueRelationship
    }
  },

  Destroy: class extends BaseObjectRequest<IssueRelationship> {
    constructor() {
      super()
      this.method = "DELETE"
      this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/issue_relationships/{issue_relationship_id}"
      this.klass = IssueRelationship
    }
  }

}