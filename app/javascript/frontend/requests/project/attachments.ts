import { Attachment } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Create = class extends BaseRequest<Attachment> {
  method = "POST"
  endpoint = [ "/api/attachments" ]
  headers = {
    "Content-Type": "multipart/form-data",
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Attachment, response)
  }
}

export const Update = class extends BaseRequest<Attachment> {
  method = "PATCH"
  endpoint = [ "/api/attachments", "/{attachment_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Attachment, response)
  }
}

export const Destroy = class extends BaseRequest<Attachment> {
  method = "DELETE"
  endpoint = [ "/api/attachments", "/{attachment_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Attachment, response)
  }
}
