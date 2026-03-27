export interface AttachmentSchema {
  id: number
  title: string
  updated_at: Date
  content_type: string
  file_url: string
  file_size: number
  file_previewable: boolean
  file_preview_url?: string | null
}
