import { User } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class UserCreate extends BaseObjectRequest<User> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/users"
    this.klass = User
  }
}
