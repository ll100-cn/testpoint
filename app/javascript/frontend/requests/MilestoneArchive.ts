import { Milestone } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class MilestoneArchive extends BaseObjectRequest<Milestone> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/milestones/{id}/archive"
    this.klass = Milestone
  }
}
