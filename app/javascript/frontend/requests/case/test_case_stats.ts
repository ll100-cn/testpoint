import { TestCaseStat } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const List = class extends BaseRequest<Array<TestCaseStat>> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/v2/projects/{project_id}/test_case_stats"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToArray(TestCaseStat, response)
  }
}
