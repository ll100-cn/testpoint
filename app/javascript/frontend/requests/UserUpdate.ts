import { User } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class UserUpdate extends BaseObjectRequest<User> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/users/{id}"
    this.klass = User
  }
}
