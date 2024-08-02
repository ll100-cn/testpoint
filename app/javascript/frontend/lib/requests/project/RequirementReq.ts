import { Requirement } from "@/models"
import BaseObjectRequest from "../BaseObjectRequest"
import BaseArrayRequest from "../BaseArrayRequest"
import BasePaginationRequest from "../BasePaginationRequest"

export default {
  List: class extends BaseArrayRequest<Requirement> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/storyboards/{storyboard_id}/requirements"
      this.klass = Requirement
    }
  },
  Create: class extends BaseObjectRequest<Requirement> {
    constructor() {
      super()
      this.method = "POST"
      this.endpoint = "/api/projects/{project_id}/storyboards/{storyboard_id}/requirements"
      this.klass = Requirement
    }
  },
  Update: class extends BaseObjectRequest<Requirement> {
    constructor() {
      super()
      this.method = "PATCH"
      this.endpoint = "/api/projects/{project_id}/storyboards/{storyboard_id}/requirements/{requirement_id}"
      this.klass = Requirement
      this.headers['Content-Type'] = 'application/json'
    }
  },
  Destroy: class extends BaseObjectRequest<Requirement> {
    constructor() {
      super()
      this.method = "DELETE"
      this.endpoint = "/api/projects/{project_id}/storyboards/{storyboard_id}/requirements/{requirement_id}"
      this.klass = Requirement
    }
  },
}
