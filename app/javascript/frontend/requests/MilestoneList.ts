import { Milestone } from "@/models"
import BaseArrayRequest from "./BaseArrayRequest"


export class MilestoneList extends BaseArrayRequest<Milestone> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/milestones"
    this.klass = Milestone
  }
}
