import { Issue } from "@/models"
import BaseObjectRequest from "../BaseObjectRequest"

export default class extends BaseObjectRequest<void> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/projects/{project_id}/issue_migrations"
    this.klass = Issue
  }
}
