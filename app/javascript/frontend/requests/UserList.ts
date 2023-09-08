import { User } from "@/models"
import BaseArrayRequest from "./BaseArrayRequest"

export class UserList extends BaseArrayRequest<User> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/users"
    this.klass = User
  }
}
