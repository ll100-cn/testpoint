import { Comment } from "@/models"
import BaseArrayRequest from "./BaseArrayRequest"

export class IssueCommentList extends BaseArrayRequest<Comment> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/comments"
    this.klass = Comment
  }
}
