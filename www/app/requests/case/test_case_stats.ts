import { BaseRequest, Scheme } from "../BaseRequest"
import { TestCaseStatListSchema, type TestCaseStatListType } from "@/schemas/test_case_stat"

class ListRequest extends BaseRequest<TestCaseStatListType> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/test_case_stats" ],
  })
  schema = TestCaseStatListSchema
}
export const List = () => new ListRequest()
