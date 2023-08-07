import { BaseRequest, PerformContext } from "./BaseRequest"
import { plainToInstance } from 'class-transformer'
import { TestCase } from "@/models"


export class TestCaseListRequest extends BaseRequest {
  initialize(): void {
    this.endpoint = "/api/projects/{project_id}/test_cases"
  }

  async perform(ctx: PerformContext): Promise<TestCase[]> {
    const resp = await this.axiosRequest(ctx, {
      method: "GET",
      url: this.buildUrl()
    })

    const data = resp.data
    const list = plainToInstance<TestCase, TestCase>(TestCase, data)
    return list
  }
}
