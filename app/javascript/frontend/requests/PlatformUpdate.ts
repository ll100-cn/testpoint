import { Platform } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class PlatformUpdate extends BaseObjectRequest<Platform> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/platforms/{platform_id}"
    this.klass = Platform
  }
}
