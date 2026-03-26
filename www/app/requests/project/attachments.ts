import { BaseRequest, Scheme, type RequestOptions } from "../BaseRequest"
import type { AxiosProgressEvent } from "axios"
import type { UploadFile } from "@/components/types"
import { AttachmentSchema } from '@/schemas/issue'
import { AttachmentBodySchema } from '@/schemas/issue_extra'

class CreateRequest extends BaseRequest<any> {
  scheme = Scheme.post({
    endpoint: "/svc/attachments",
    relatedKeys: [ [ "/attachments" ] ]
  })
  headers = {
    "Content-Type": "multipart/form-data",
  }
  schema = AttachmentSchema

  async perform(overrides: RequestOptions = {}): Promise<any> {
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
}
export const Create = () => new CreateRequest()


class UpdateRequest extends BaseRequest<any> {
  scheme = Scheme.patch({
    endpoint: "/svc/attachments/{attachment_id}",
    relatedKeys: [ [ "/attachments", "/{attachment_id}" ] ]
  })

  schema = AttachmentSchema
  bodySchema = AttachmentBodySchema
}
export const Update = () => new UpdateRequest()


class DestroyRequest extends BaseRequest<any> {
  scheme = Scheme.delete({
    endpoint: "/svc/attachments/{attachment_id}",
    relatedKeys: [ [ "/attachments" ] ]
  })

  schema = AttachmentSchema
}
export const Destroy = () => new DestroyRequest()
