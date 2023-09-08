import { Comment } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class IssueCommentCreate extends BaseObjectRequest<Comment> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/comments"
    this.klass = Comment
  }
}
