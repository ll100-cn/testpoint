import { Member } from "@/models"
import BasePaginationRequest from "./BasePaginationRequest"

export class MemberPaginationList extends BasePaginationRequest<Member> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/members"
    this.klass = Member
  }
}
