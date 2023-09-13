import { Member } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export default class extends BaseObjectRequest<Member> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/members/{member_id}/archive"
    this.klass = Member
  }
}
