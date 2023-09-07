import { Attachment } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class AttachmentDestroy extends BaseObjectRequest<Attachment> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/attachments/{attachment_id}"
    this.klass = Attachment
  }
}
