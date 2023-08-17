import { BaseRequest, PerformContext } from "./BaseRequest"
import { plainToInstance } from 'class-transformer'
import { Milestone } from "@/models"


export class MilestoneListRequest extends BaseRequest {
  initialize(): void {
    this.endpoint = "/api/projects/{project_id}/milestones"
  }

  async perform(ctx: PerformContext): Promise<Milestone[]> {
    const resp = await this.axiosRequest(ctx, {
      method: "GET",
      url: this.buildUrl()
    })

    const data = resp.data
    const list = plainToInstance<Milestone, Milestone>(Milestone, data)
    return list
  }
}
