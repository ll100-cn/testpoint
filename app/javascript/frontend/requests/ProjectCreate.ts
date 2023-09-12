import { Project } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class ProjectCreate extends BaseObjectRequest<Project> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/projects"
    this.klass = Project
  }
}
