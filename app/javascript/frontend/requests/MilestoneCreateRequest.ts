import { BaseRequest, PerformContext } from "./BaseRequest"
import { plainToClass, plainToInstance } from 'class-transformer'
import { Milestone } from "@/models"


export class MilestoneCreateRequest extends BaseRequest {
  initialize(): void {
    this.endpoint = "/api/projects/{project_id}/milestones"
  }

  async perform(ctx: PerformContext, data: any): Promise<Milestone> {
    try {
      const resp = await this.axiosRequest(ctx, {
        method: "POST",
        url: this.buildUrl(),
        data: data
      })

      const resource = plainToInstance(Milestone, resp.data)
      return resource
    } catch (error) {
      this.handleUnprocessableEntity(error)
      throw error
    }
  }
}
