import { Member } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class MemberCreate extends BaseObjectRequest<Member> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/projects/{project_id}/members"
    this.klass = Member
  }
}
