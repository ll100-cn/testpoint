import { IssueTemplate } from "@/models"
import BaseObjectRequest from "../BaseObjectRequest"
import BaseArrayRequest from "../BaseArrayRequest"

export default {
  Create: class extends BaseObjectRequest<IssueTemplate> {
    constructor() {
      super()
      this.method = "POST"
      this.endpoint = "/api/projects/{project_id}/issue_templates"
      this.klass = IssueTemplate
    }
  },

  Get: class extends BaseObjectRequest<IssueTemplate> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/issue_templates/{issue_template_id}"
      this.klass = IssueTemplate
    }
  },

  Update: class extends BaseObjectRequest<IssueTemplate> {
    constructor() {
      super()
      this.method = "PATCH"
      this.endpoint = "/api/projects/{project_id}/issue_templates/{issue_template_id}"
      this.klass = IssueTemplate
    }
  },

  Destroy: class extends BaseObjectRequest<IssueTemplate> {
    constructor() {
      super()
      this.method = "DELETE"
      this.endpoint = "/api/projects/{project_id}/issue_templates/{issue_template_id}"
      this.klass = IssueTemplate
    }
  },

  List: class extends BaseArrayRequest<IssueTemplate> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/issue_templates"
      this.klass = IssueTemplate
    }
  }

}