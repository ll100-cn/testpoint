import { Member } from "@/models"
import BaseObjectRequest from "../BaseObjectRequest"
import BaseArrayRequest from "../BaseArrayRequest"
import BasePaginationRequest from "../BasePaginationRequest"

export default {
  Create: class extends BaseObjectRequest<Member> {
    constructor() {
      super()
      this.method = "POST"
      this.endpoint = "/api/projects/{project_id}/members"
      this.klass = Member
    }
  },

  Get: class extends BaseObjectRequest<Member> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/members/{member_id}"
      this.klass = Member
    }
  },

  Update: class extends BaseObjectRequest<Member> {
    constructor() {
      super()
      this.method = "PATCH"
      this.endpoint = "/api/projects/{project_id}/members/{member_id}"
      this.klass = Member
    }
  },

  Destroy: class extends BaseObjectRequest<Member> {
    constructor() {
      super()
      this.method = "DELETE"
      this.endpoint = "/api/projects/{project_id}/members/{member_id}"
      this.klass = Member
    }
  },

  Archive: class extends BaseObjectRequest<Member> {
    constructor() {
      super()
      this.method = "PATCH"
      this.endpoint = "/api/projects/{project_id}/members/{member_id}/archive"
      this.klass = Member
    }
  }
}
