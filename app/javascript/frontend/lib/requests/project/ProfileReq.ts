import { Profile } from "@/models"
import BaseObjectRequest from "../BaseObjectRequest"

export default {
  Get: class extends BaseObjectRequest<Profile> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/profile"
      this.klass = Profile
    }
  },

  Update: class extends BaseObjectRequest<Profile> {
    constructor() {
      super()
      this.method = "PATCH"
      this.endpoint = "/api/projects/{project_id}/profile"
      this.klass = Profile
    }
  }
}
