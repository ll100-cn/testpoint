import { User } from "@/models"
import BaseObjectRequest from "../BaseObjectRequest"

export default {
  Update: class extends BaseObjectRequest<User> {
    constructor() {
      super()
      this.method = "PATCH"
      this.endpoint = "/api/profile/user"
      this.klass = User
    }
  }
}