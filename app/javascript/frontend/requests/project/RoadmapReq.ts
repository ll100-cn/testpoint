import { Roadmap } from "@/models"
import BaseObjectRequest from "../BaseObjectRequest"
import BaseArrayRequest from "../BaseArrayRequest"
import BasePaginationRequest from "../BasePaginationRequest"

export default {
  List: class extends BaseArrayRequest<Roadmap> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/roadmaps"
      this.klass = Roadmap
    }
  },
  Create: class extends BaseObjectRequest<Roadmap> {
    constructor() {
      super()
      this.method = "POST"
      this.endpoint = "/api/projects/{project_id}/roadmaps"
      this.klass = Roadmap
    }
  },
  Update: class extends BaseObjectRequest<Roadmap> {
    constructor() {
      super()
      this.method = "PATCH"
      this.endpoint = "/api/projects/{project_id}/roadmaps/{roadmap_id}"
      this.klass = Roadmap
    }
  },
  Destroy: class extends BaseObjectRequest<Roadmap> {
    constructor() {
      super()
      this.method = "DELETE"
      this.endpoint = "/api/projects/{project_id}/roadmaps/{roadmap_id}"
      this.klass = Roadmap
    }
  },
}
