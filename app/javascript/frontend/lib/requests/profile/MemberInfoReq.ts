import { MemberInfo } from "@/models"
import BaseArrayRequest from "../BaseArrayRequest"
import BaseObjectRequest from "../BaseObjectRequest"

export default {
  List: class extends BaseArrayRequest<MemberInfo> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/profile/member_infos"
      this.klass = MemberInfo
    }
  },

  Update: class extends BaseObjectRequest<MemberInfo> {
    constructor() {
      super()
      this.method = "PATCH"
      this.endpoint = "/api/profile/member_infos/{id}"
      this.klass = MemberInfo
    }
  }
}