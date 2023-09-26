import { MemberInfo } from "@/models"
import BaseArrayRequest from "../BaseArrayRequest"

export default {
  List: class extends BaseArrayRequest<MemberInfo> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/profile/member_infos"
      this.klass = MemberInfo
    }
  }
}