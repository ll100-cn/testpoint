import { Milestone } from "@/models"
import BaseObjectRequest from "../BaseObjectRequest"
import BaseArrayRequest from "../BaseArrayRequest"


export default {
  Create: class extends BaseObjectRequest<Milestone> {
    constructor() {
      super()
      this.method = "POST"
      this.endpoint = "/api/projects/{project_id}/milestones"
      this.klass = Milestone
    }
  },

  Get: class extends BaseObjectRequest<Milestone> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/milestones/{id}"
      this.klass = Milestone
    }
  },

  Update: class extends BaseObjectRequest<Milestone> {
    constructor() {
      super()
      this.method = "PATCH"
      this.endpoint = "/api/projects/{project_id}/milestones/{id}"
      this.klass = Milestone
    }
  },

  List: class extends BaseArrayRequest<Milestone> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/milestones"
      this.klass = Milestone
    }
  },

  Destroy: class extends BaseObjectRequest<Milestone> {
    constructor() {
      super()
      this.method = "DELETE"
      this.endpoint = "/api/projects/{project_id}/milestones/{id}"
      this.klass = Milestone
    }
  },

  Archive: class extends BaseObjectRequest<Milestone> {
    constructor() {
      super()
      this.method = "PATCH"
      this.endpoint = "/api/projects/{project_id}/milestones/{id}/archive"
      this.klass = Milestone
    }
  },

  Active: class extends BaseObjectRequest<Milestone> {
    constructor() {
      super()
      this.method = "PATCH"
      this.endpoint = "/api/projects/{project_id}/milestones/{id}/active"
      this.klass = Milestone
    }
  }
}
