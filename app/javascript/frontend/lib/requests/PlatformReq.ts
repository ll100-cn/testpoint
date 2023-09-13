import { Platform } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"
import BaseArrayRequest from "./BaseArrayRequest"

export default {
  Update: class extends BaseObjectRequest<Platform> {
    constructor() {
      super()
      this.method = "PATCH"
      this.endpoint = "/api/projects/{project_id}/platforms/{platform_id}"
      this.klass = Platform
    }
  },

  List: class extends BaseArrayRequest<Platform> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/platforms"
      this.klass = Platform
    }
  },

  Get: class extends BaseObjectRequest<Platform> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/platforms/{platform_id}"
      this.klass = Platform
    }
  },

  Destroy: class extends BaseObjectRequest<Platform> {
    constructor() {
      super()
      this.method = "DELETE"
      this.endpoint = "/api/projects/{project_id}/platforms/{platform_id}"
      this.klass = Platform
    }
  },

  Create: class extends BaseObjectRequest<Platform> {
    constructor() {
      super()
      this.method = "POST"
      this.endpoint = "/api/projects/{project_id}/platforms"
      this.klass = Platform
    }
  }
}