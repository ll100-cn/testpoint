import { Member } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class MemberDestroy extends BaseObjectRequest<Member> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/projects/{project_id}/members/{member_id}"
    this.klass = Member
  }
}
