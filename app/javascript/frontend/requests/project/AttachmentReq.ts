import { Attachment } from "@/models"
import BaseObjectRequest from "../BaseObjectRequest"

export default {
  Create: class extends BaseObjectRequest<Attachment> {
    constructor() {
      super()
      this.method = "POST"
      this.endpoint = "/api/attachments"
      this.klass = Attachment
      this.headers = {
        "Content-Type": "multipart/form-data",
      }
    }
  },

  Update: class extends BaseObjectRequest<Attachment> {
    constructor() {
      super()
      this.method = "PATCH"
      this.endpoint = "/api/attachments/{attachment_id}"
      this.klass = Attachment
    }
  },

  Destroy: class extends BaseObjectRequest<Attachment> {
    constructor() {
      super()
      this.method = "DELETE"
      this.endpoint = "/api/attachments/{attachment_id}"
      this.klass = Attachment
    }
  }

}
