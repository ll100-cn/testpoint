import { BaseRequest, PerformContext } from "./BaseRequest"
import { plainToInstance } from 'class-transformer'
import { TestCase } from "@/models"


export class TestCaseHistoryRequest extends BaseRequest {
  initialize(): void {
    this.endpoint = "/api/projects/{project_id}/test_cases/{id}/history"
  }

  async perform(ctx: PerformContext): Promise<TestCase[]> {
    const resp = await this.axiosRequest(ctx, {
      method: "GET",
      url: this.buildUrl()
    })

    const list = plainToInstance<TestCase, TestCase>(TestCase, resp.data)
    return list
  }
}
