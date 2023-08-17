import { BaseRequest, PerformContext } from "./BaseRequest"
import { plainToClass, plainToInstance } from 'class-transformer'
import { TestCase } from "@/models"


export class TestCaseDestroyRequest extends BaseRequest {
  initialize(): void {
    this.endpoint = "/api/projects/{project_id}/test_cases/{id}"
  }

  async perform(ctx: PerformContext): Promise<TestCase> {
    try {
      const resp = await this.axiosRequest(ctx, {
        method: "DELETE",
        url: this.buildUrl()
      })

      const resource = plainToInstance(TestCase, resp.data)
      return resource
    } catch (error) {
      this.handleUnprocessableEntity(error)
      throw error
    }
  }
}
