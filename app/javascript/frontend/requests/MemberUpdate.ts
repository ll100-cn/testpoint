import { Member } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class MemberUpdate extends BaseObjectRequest<Member> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/members/{member_id}"
    this.klass = Member
  }
}
