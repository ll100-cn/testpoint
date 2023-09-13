import { Category } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"
import BaseArrayRequest from "./BaseArrayRequest"

export default {
  Create: class extends BaseObjectRequest<Category> {
    constructor() {
      super()
      this.method = "POST"
      this.endpoint = "/api/projects/{project_id}/categories"
      this.klass = Category
    }
  },

  Get: class extends BaseObjectRequest<Category> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/categories/{category_id}"
      this.klass = Category
    }
  },

  Update: class extends BaseObjectRequest<Category> {
    constructor() {
      super()
      this.method = "PATCH"
      this.endpoint = "/api/projects/{project_id}/categories/{category_id}"
      this.klass = Category
    }
  },

  Destroy: class extends BaseObjectRequest<Category> {
    constructor() {
      super()
      this.method = "DELETE"
      this.endpoint = "/api/projects/{project_id}/categories/{category_id}"
      this.klass = Category
    }
  },

  List: class extends BaseArrayRequest<Category> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/categories"
      this.klass = Category
    }
  }
}
