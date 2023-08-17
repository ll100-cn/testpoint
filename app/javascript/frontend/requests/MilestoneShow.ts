import { Milestone } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"


export class MilestoneShow extends BaseObjectRequest<Milestone> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/milestones/{id}"
    this.klass = Milestone
  }
}
