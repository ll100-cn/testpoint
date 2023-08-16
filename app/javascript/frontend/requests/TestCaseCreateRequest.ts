import { BaseRequest, PerformContext } from "./BaseRequest"
import { plainToClass, plainToInstance } from 'class-transformer'
import { TestCase } from "@/models"


export class TestCaseCreateRequest extends BaseRequest {
  initialize(): void {
    this.endpoint = "/api/projects/{project_id}/test_cases"
  }

  async perform(ctx: PerformContext, data: any): Promise<TestCase> {
    try {
      const resp = await this.axiosRequest(ctx, {
        method: "POST",
        url: this.buildUrl(),
        data: data
      })

      const resource = plainToInstance(TestCase, resp.data)
      return resource
    } catch (error) {
      this.handleUnprocessableEntity(error)
      throw error
    }
  }
}
