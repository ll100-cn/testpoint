import { Milestone } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"


export class MilestoneDestroy extends BaseObjectRequest<Milestone> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/projects/{project_id}/milestones/{id}"
    this.klass = Milestone
  }
}
