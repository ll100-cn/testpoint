import { Issue } from "@/models"
import BaseObjectRequest from "../BaseObjectRequest"
import BasePaginationRequest from "../BasePaginationRequest"

export default {
  Create: class extends BaseObjectRequest<Issue> {
    constructor() {
      super()
      this.method = "POST"
      this.endpoint = "/api/projects/{project_id}/issues"
      this.klass = Issue
    }
  },

  Get: class extends BaseObjectRequest<Issue> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/issues/{issue_id}"
      this.klass = Issue
    }
  },

  Update: class extends BaseObjectRequest<Issue> {
    constructor() {
      super()
      this.method = "PATCH"
      this.endpoint = "/api/projects/{project_id}/issues/{issue_id}"
      this.klass = Issue
    }
  },

  Archive: class extends BaseObjectRequest<Issue> {
    constructor() {
      super()
      this.method = "PATCH"
      this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/archive"
      this.klass = Issue
    }
  },

  Page: class extends BasePaginationRequest<Issue> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/issues"
      this.klass = Issue
    }
  }
}