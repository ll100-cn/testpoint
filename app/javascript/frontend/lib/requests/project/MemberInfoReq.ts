import { MemberInfo } from "@/models"
import BaseArrayRequest from "../BaseArrayRequest"

export default {
  List: class extends BaseArrayRequest<MemberInfo> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/member_infos"
      this.klass = MemberInfo
    }
  }
}
