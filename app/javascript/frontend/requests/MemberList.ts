import { Member } from "@/models"
import BaseArrayRequest from "./BaseArrayRequest"

export class MemberList extends BaseArrayRequest<Member> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/members"
    this.klass = Member
  }
}
