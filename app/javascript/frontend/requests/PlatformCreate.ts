import { Platform } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class PlatformCreate extends BaseObjectRequest<Platform> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/projects/{project_id}/platforms"
    this.klass = Platform
  }
}
