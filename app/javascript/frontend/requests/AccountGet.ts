import { User } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class AccountGet extends BaseObjectRequest<User> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/account"
    this.klass = User
  }
}
