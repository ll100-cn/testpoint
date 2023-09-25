import { User } from "@/models"
import BaseObjectRequest from "../BaseObjectRequest"
import BaseArrayRequest from "../BaseArrayRequest"
import BasePaginationRequest from "../BasePaginationRequest"

export default {
  Update: class extends BaseObjectRequest<User> {
    constructor() {
      super()
      this.method = "PATCH"
      this.endpoint = "/api/admin/users/{id}"
      this.klass = User
    }
  },

  Get: class extends BaseObjectRequest<User> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/admin/users/{id}"
      this.klass = User
    }
  },

  Destroy: class extends BaseObjectRequest<User> {
    constructor() {
      super()
      this.method = "DELETE"
      this.endpoint = "/api/admin/users/{id}"
      this.klass = User
    }
  },

  Create: class extends BaseObjectRequest<User> {
    constructor() {
      super()
      this.method = "POST"
      this.endpoint = "/api/admin/users"
      this.klass = User
    }
  },

  Page: class extends BasePaginationRequest<User> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/admin/users"
      this.klass = User
    }
  }
}