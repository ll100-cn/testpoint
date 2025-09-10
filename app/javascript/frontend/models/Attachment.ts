import { Type } from "class-transformer"
import _ from "lodash"
import type { AttachmentSchema } from './schema/attachment'

export class Attachment implements AttachmentSchema {
  contentType!: string
  id!: number
  title!: string

  @Type(() => Date) updatedAt!: Date

  fileUrl!: string
  fileSize!: number
  filePreviewable!: boolean
  filePreviewUrl?: string


  isImage() {
    return _.startsWith(this.contentType, "image/")
  }

  isVideo() {
    return _.startsWith(this.contentType, "video/") && _.includes(this.contentType, "mp4")
  }

  isAudio() {
    return _.startsWith(this.contentType, "audio/")
  }
}
