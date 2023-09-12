import { Project } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class ProjectUpdate extends BaseObjectRequest<Project> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{id}"
    this.klass = Project
  }
}
