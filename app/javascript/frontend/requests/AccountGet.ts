import BaseObjectRequest from "./BaseObjectRequest"
import { Account } from "@/models/Account"

export class AccountGet extends BaseObjectRequest<Account> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/account"
    this.klass = Account
  }
}
