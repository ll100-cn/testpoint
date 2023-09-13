import { Attachment } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class AttachmentCreate extends BaseObjectRequest<Attachment> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/attachments"
    this.klass = Attachment
    this.headers = {
      "Content-Type": "multipart/form-data",
    }
  }
}
