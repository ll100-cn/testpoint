import { User } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class UserGet extends BaseObjectRequest<User> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/users/{user_id}"
    this.klass = User
  }
}
