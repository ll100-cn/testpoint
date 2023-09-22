export class UploadFile {
  file: File
  state: "pending" | "success" | "uploading" = "pending"
  loaded = 0
  total = 0
  controller = new AbortController()

  constructor(file: File) {
    this.file = file
  }
}