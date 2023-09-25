import { Comment } from "@/models"
import BaseObjectRequest from "../BaseObjectRequest"
import BaseArrayRequest from "../BaseArrayRequest"

export default {
  Create: class extends BaseObjectRequest<Comment> {
    constructor() {
      super()
      this.method = "POST"
      this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/comments"
      this.klass = Comment
    }
  },

  List: class extends BaseArrayRequest<Comment> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/comments"
      this.klass = Comment
    }
  },

  Update: class extends BaseObjectRequest<Comment> {
    constructor() {
      super()
      this.method = "PATCH"
      this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/comments/{comment_id}"
      this.klass = Comment
    }
  },

  Destroy: class extends BaseObjectRequest<Comment> {
    constructor() {
      super()
      this.method = "DELETE"
      this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/comments/{comment_id}"
      this.klass = Comment
    }
  }
}
