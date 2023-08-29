import { Role } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class MemberRoleList extends BaseObjectRequest<Role> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/members/roles"
    this.klass = Role
  }
}
