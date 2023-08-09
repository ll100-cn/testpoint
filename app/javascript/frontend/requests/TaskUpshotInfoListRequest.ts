import { BaseRequest, PerformContext } from "./BaseRequest"
import { plainToInstance } from 'class-transformer'
import { TaskUpshotInfo } from "@/models"


export class TaskUpshotInfoListRequest extends BaseRequest {
  initialize(): void {
    this.endpoint = "/api/projects/{project_id}/plans/{plan_id}/phases/{phase_index}/task_upshot_infos"
  }

  async perform(ctx: PerformContext): Promise<TaskUpshotInfo[]> {
    const resp = await this.axiosRequest(ctx, {
      method: "GET",
      url: this.buildUrl()
    })

    const data = resp.data
    const list = plainToInstance<TaskUpshotInfo, TaskUpshotInfo>(TaskUpshotInfo, data)
    return list
  }
}
