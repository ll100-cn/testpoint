import { User } from "@/models"
import BasePaginationRequest from "./BasePaginationRequest"

export class UserPaginationList extends BasePaginationRequest<User> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/users"
    this.klass = User
  }
}
