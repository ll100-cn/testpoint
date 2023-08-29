import { Platform } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class PlatformShow extends BaseObjectRequest<Platform> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/platforms/{platform_id}"
    this.klass = Platform
  }
}
