import { RequirementStat } from "@/models"
import BaseArrayRequest from "../BaseArrayRequest"

export default {
  List: class extends BaseArrayRequest<RequirementStat> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/storyboards/{storyboard_id}/requirement_stats"
      this.klass = RequirementStat
    }
  },
}
