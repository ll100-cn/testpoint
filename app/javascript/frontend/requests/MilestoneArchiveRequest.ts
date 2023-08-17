import { BaseRequest, PerformContext } from "./BaseRequest"
import { plainToClass, plainToInstance } from 'class-transformer'
import { Milestone } from "@/models"


export class MilestoneArchiveRequest extends BaseRequest {
  initialize(): void {
    this.endpoint = "/api/projects/{project_id}/milestones/{id}/archive"
  }

  async perform(ctx: PerformContext): Promise<void> {
    try {
      const resp = await this.axiosRequest(ctx, {
        method: "PATCH",
        url: this.buildUrl()
      })
    } catch (error) {
      this.handleUnprocessableEntity(error)
      throw error
    }
  }
}
