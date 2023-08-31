import { Project } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class ProjectShow extends BaseObjectRequest<Project> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}"
    this.klass = Project
  }
}
