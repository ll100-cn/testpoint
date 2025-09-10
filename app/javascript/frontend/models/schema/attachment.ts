export interface AttachmentSchema {
  id: number
  title: string
  updatedAt: Date
  contentType: string
  fileUrl: string
  fileSize: number
  filePreviewable: boolean
  filePreviewUrl?: string | null
}
