import { Account } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class AccountSignOut extends BaseObjectRequest<Account> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/sign_out"
    this.klass = Account
  }
}
