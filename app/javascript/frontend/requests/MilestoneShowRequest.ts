import { BaseRequest, PerformContext } from "./BaseRequest"
import { plainToInstance } from 'class-transformer'
import { Milestone } from "@/models"


export class MilestoneShowRequest extends BaseRequest {
  initialize(): void {
    this.endpoint = "/api/projects/{project_id}/milestones/{id}"
  }

  async perform(ctx: PerformContext): Promise<Milestone> {
    const resp = await this.axiosRequest(ctx, {
      method: "GET",
      url: this.buildUrl()
    })

    const data = resp.data
    const resource = plainToInstance(Milestone, data)
    return resource
  }
}
