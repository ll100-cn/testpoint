import { Type } from "class-transformer"
import _ from "lodash"

export class Attachment {
  content_type: string
  id: number
  title: string

  @Type(() => Date)
  updated_at: Date

  file_url: string
  file_size: number

  isImage() {
    return _.startsWith(this.content_type, "image/")
  }

  isVideo() {
    return _.startsWith(this.content_type, "video/") && _.includes(this.content_type, "mp4")
  }
}
