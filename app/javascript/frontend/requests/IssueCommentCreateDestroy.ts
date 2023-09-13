import { Comment } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class IssueCommentCreateDestroy extends BaseObjectRequest<Comment> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/comments/{comment_id}"
    this.klass = Comment
  }
}
