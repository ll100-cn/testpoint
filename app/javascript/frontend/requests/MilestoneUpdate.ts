import { Milestone } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"


export class MilestoneUpdate extends BaseObjectRequest<Milestone> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/milestones/{id}"
    this.klass = Milestone
  }
}
