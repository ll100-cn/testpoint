import { Attachment } from "@/models"
import { BaseRequest, Scheme, type RequestOptions } from "../BaseRequest"
import type { AxiosProgressEvent, AxiosResponse } from "axios"
import type { UploadFile } from "@/components/types"

class CreateRequest extends BaseRequest<Attachment> {
  scheme = Scheme.post({
    endpoint: "/api/attachments",
    relatedKeys: [ [ "/attachments" ] ]
  })
  headers = {
    "Content-Type": "multipart/form-data",
  }

  async perform(overrides: RequestOptions = {}): Promise<Attachment> {
    this.interpolations = overrides.interpolations ?? this.interpolations
    this.query = overrides.query ?? this.query

    const upload_file = overrides.body!.upload_file as UploadFile
    const options = {
      interpolations: overrides.interpolations ?? this.interpolations,
      query: overrides.query ?? this.query,
      body: { file: upload_file.file },
    }
    const config = this.buildPerformConfig(options)
    config.onUploadProgress = (progressEvent: AxiosProgressEvent) => {
      upload_file.state = "uploading"
      upload_file.loaded = progressEvent.loaded
      upload_file.total = progressEvent.total ?? 0
    }
    try {
      const resp = await this.ctx.$axios.request(config)
      return this.processResponse(resp)
    } catch (e) {
      return this.processError(e)
    }
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Attachment, response)
  }
}
export const Create = () => new CreateRequest()


class UpdateRequest extends BaseRequest<Attachment> {
  scheme = Scheme.patch({
    endpoint: "/api/attachments/{attachment_id}",
    relatedKeys: [ [ "/attachments", "/{attachment_id}" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Attachment, response)
  }
}
export const Update = () => new UpdateRequest()


class DestroyRequest extends BaseRequest<Attachment> {
  scheme = Scheme.delete({
    endpoint: "/api/attachments/{attachment_id}",
    relatedKeys: [ [ "/attachments" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Attachment, response)
  }
}
export const Destroy = () => new DestroyRequest()
