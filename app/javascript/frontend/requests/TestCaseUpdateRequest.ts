import { BaseRequest, ErrorUnprocessableEntity, PerformContext } from "./BaseRequest"
import { plainToClass, plainToInstance } from 'class-transformer'
import { TestCase, Validation } from "@/models"
import { AxiosError, AxiosResponse } from "axios"


export class TestCaseUpdateRequest extends BaseRequest {
  initialize(): void {
    this.endpoint = "/api/projects/{project_id}/test_cases/{id}"

  }

  async perform(ctx: PerformContext, data: any): Promise<TestCase> {
    try {
      const resp = await this.axiosRequest(ctx, {
        method: "PATCH",
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
