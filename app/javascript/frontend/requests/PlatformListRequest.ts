import { BaseRequest, PerformContext } from "./BaseRequest"
import { plainToInstance } from 'class-transformer'
import { Platform } from "@/models"


export class PlatformListRequest extends BaseRequest {
  initialize(): void {
    this.endpoint = "/api/projects/{project_id}/platforms"
  }

  async perform(ctx: PerformContext): Promise<Platform[]> {
    const resp = await this.axiosRequest(ctx, {
      method: "GET",
      url: this.buildUrl()
    })

    const data = resp.data
    const list = plainToInstance<Platform, Platform>(Platform, data)
    return list
  }
}
