import { Milestone } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"


export class MilestoneCreate extends BaseObjectRequest<Milestone> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/projects/{project_id}/milestones"
    this.klass = Milestone
  }
}
