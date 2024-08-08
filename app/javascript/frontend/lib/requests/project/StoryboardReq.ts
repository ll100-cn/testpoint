import { Storyboard } from "@/models"
import BaseObjectRequest from "../BaseObjectRequest"
import BaseArrayRequest from "../BaseArrayRequest"
import BasePaginationRequest from "../BasePaginationRequest"

export default {
  List: class extends BaseArrayRequest<Storyboard> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/storyboards"
      this.klass = Storyboard
    }
  },
  Get: class extends BaseObjectRequest<Storyboard> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/storyboards/{storyboard_id}"
      this.klass = Storyboard
    }
  },
  Create: class extends BaseObjectRequest<Storyboard> {
    constructor() {
      super()
      this.method = "POST"
      this.endpoint = "/api/projects/{project_id}/storyboards"
      this.klass = Storyboard
    }
  },
  Update: class extends BaseObjectRequest<Storyboard> {
    constructor() {
      super()
      this.method = "PATCH"
      this.endpoint = "/api/projects/{project_id}/storyboards/{storyboard_id}"
      this.klass = Storyboard
      this.headers['Content-Type'] = 'application/json'
    }
  },
  Destroy: class extends BaseObjectRequest<Storyboard> {
    constructor() {
      super()
      this.method = "DELETE"
      this.endpoint = "/api/projects/{project_id}/storyboards/{storyboard_id}"
      this.klass = Storyboard
    }
  },
}
