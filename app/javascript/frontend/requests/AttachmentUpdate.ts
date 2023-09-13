import { Attachment } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class AttachmentUpdate extends BaseObjectRequest<Attachment> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/attachments/{attachment_id}"
    this.klass = Attachment
  }
}
