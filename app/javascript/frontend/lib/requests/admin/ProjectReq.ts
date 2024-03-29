import { Project } from "@/models"
import BaseObjectRequest from "../BaseObjectRequest"
import BasePaginationRequest from "../BasePaginationRequest"

export default {
  Update: class extends BaseObjectRequest<Project> {
    constructor() {
      super()
      this.method = "PATCH"
      this.endpoint = "/api/admin/projects/{id}"
      this.klass = Project
    }
  },

  Get: class extends BaseObjectRequest<Project> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/admin/projects/{project_id}"
      this.klass = Project
    }
  },

  Destroy: class extends BaseObjectRequest<Project> {
    constructor() {
      super()
      this.method = "DELETE"
      this.endpoint = "/api/admin/projects/{id}"
      this.klass = Project
    }
  },

  Create: class extends BaseObjectRequest<Project> {
    constructor() {
      super()
      this.method = "POST"
      this.endpoint = "/api/admin/projects"
      this.klass = Project
    }
  },

  Page: class extends BasePaginationRequest<Project> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/admin/projects"
      this.klass = Project
    }
  }
}