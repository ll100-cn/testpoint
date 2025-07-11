import { TestCaseStat } from "@/models"
import { BaseRequest, Scheme } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class ListRequest extends BaseRequest<Array<TestCaseStat>> {
  scheme = Scheme.get({
    endpoint: [ "/api/v2", "/projects/{project_id}", "/test_case_stats" ],
  })

  processResponse(response: AxiosResponse) {
    return this.responseToArray(TestCaseStat, response)
  }
}
export const List = () => new ListRequest()
