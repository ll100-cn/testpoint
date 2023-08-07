import { BaseRequest, PerformContext } from "./BaseRequest"
import { plainToInstance } from 'class-transformer'
import { TestCaseLabel } from "@/models"


export class TestCaseLabelListRequest extends BaseRequest {
  initialize(): void {
    this.endpoint = "/api/projects/{project_id}/test_case_labels"
  }

  async perform(ctx: PerformContext): Promise<TestCaseLabel[]> {
    const resp = await this.axiosRequest(ctx, {
      method: "GET",
      url: this.buildUrl()
    })

    const data = resp.data
    const list = plainToInstance<TestCaseLabel, TestCaseLabel>(TestCaseLabel, data)
    return list
  }
}
