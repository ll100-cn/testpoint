import { Project } from "@/models"
import { BaseObjectRequest } from "."

export class ProjectDestroy extends BaseObjectRequest<Project> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/projects/{id}"
    this.klass = Project
  }
}
