import { Account } from "@/models"
import BaseObjectRequest from "../BaseObjectRequest"

export default {
  Update: class extends BaseObjectRequest<Account> {
    constructor() {
      super()
      this.method = "PATCH"
      this.endpoint = "/api/profile/basic"
      this.klass = Account
    }
  },

  Get: class extends BaseObjectRequest<Account> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/profile"
      this.klass = Account
    }
  }
}