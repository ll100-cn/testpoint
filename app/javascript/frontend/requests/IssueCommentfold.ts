import { Comment } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class IssueCommentFold extends BaseObjectRequest<Comment> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/comments/{comment_id}/fold"
    this.klass = Comment
  }
}
