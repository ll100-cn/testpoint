import { Attachment } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Create = class extends BaseRequest<Attachment> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/attachments"
    this.headers = {
      "Content-Type": "multipart/form-data",
    }
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Attachment, response)
  }
}

export const Update = class extends BaseRequest<Attachment> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/attachments/{attachment_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Attachment, response)
  }
}

export const Destroy = class extends BaseRequest<Attachment> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/attachments/{attachment_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Attachment, response)
  }
}
