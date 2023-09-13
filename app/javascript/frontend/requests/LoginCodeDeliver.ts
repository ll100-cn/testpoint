import { LoginCode } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class LoginCodeDeliver extends BaseObjectRequest<LoginCode> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/deliver"
    this.klass = LoginCode
  }
}
