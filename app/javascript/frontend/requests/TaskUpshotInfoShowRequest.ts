import { BaseRequest, PerformContext } from "./BaseRequest"
import { plainToInstance } from 'class-transformer'
import { TaskUpshotInfo } from "@/models"


export class TaskUpshotInfoShowRequest extends BaseRequest {
  initialize(): void {
    this.endpoint = "/api/projects/{project_id}/plans/{plan_id}/phases/{phase_index}/task_upshot_infos/{id}"
  }

  async perform(ctx: PerformContext): Promise<TaskUpshotInfo> {
    const resp = await this.axiosRequest(ctx, {
      method: "GET",
      url: this.buildUrl()
    })

    const resouce = plainToInstance(TaskUpshotInfo, resp.data)
    return resouce
  }
}
