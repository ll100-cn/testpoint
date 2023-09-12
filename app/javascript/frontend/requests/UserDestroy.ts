import { User } from "@/models"
import { BaseObjectRequest } from "."

export class UserDestroy extends BaseObjectRequest<User> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/users/{id}"
    this.klass = User
  }
}
