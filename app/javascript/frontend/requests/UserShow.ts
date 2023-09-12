import { User } from "@/models"
import { BaseObjectRequest } from "."

export class UserGet extends BaseObjectRequest<User> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/users/{id}"
    this.klass = User
  }
}
