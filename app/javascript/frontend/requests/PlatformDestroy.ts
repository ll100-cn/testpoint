import { Platform } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class PlatformDestroy extends BaseObjectRequest<Platform> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/projects/{project_id}/platforms/{platform_id}"
    this.klass = Platform
  }
}
