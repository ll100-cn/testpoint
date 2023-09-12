import { Project } from "@/models"
import BasePaginationRequest from "./BasePaginationRequest"

export class ProjectPaginationList extends BasePaginationRequest<Project> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects"
    this.klass = Project
  }
}
