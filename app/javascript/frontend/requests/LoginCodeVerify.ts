import { LoginCode } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class LoginCodeVerify extends BaseObjectRequest<LoginCode> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/sign_in"
    this.klass = LoginCode
  }
}
