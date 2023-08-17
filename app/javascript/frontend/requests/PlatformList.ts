import { Platform } from "@/models"
import BaseArrayRequest from "./BaseArrayRequest"


export class PlatformList extends BaseArrayRequest<Platform> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/platforms"
    this.klass = Platform
  }
}
