import { Account } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export default {
  Get: class extends BaseObjectRequest<Account> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/profile"
      this.klass = Account
    }
  }
}
