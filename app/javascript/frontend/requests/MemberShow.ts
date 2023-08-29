import { Member } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class MemberShow extends BaseObjectRequest<Member> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/members/{member_id}"
    this.klass = Member
  }
}
