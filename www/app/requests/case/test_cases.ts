import { BaseRequest, Scheme } from "../BaseRequest"
import { TestCaseBodySchema, TestCaseBoxSchema, TestCaseListSchema, type TestCaseBoxType, type TestCaseListType } from "@/schemas/test_case"

class UpdateRequest extends BaseRequest<TestCaseBoxType> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/test_cases/{id}",
    relatedKeys: [ [ "/test_cases", "/{id}" ], "/test_cases" ]
  })
  schema = TestCaseBoxSchema
  bodySchema = TestCaseBodySchema
}
export const Update = () => new UpdateRequest()


class ListRequest extends BaseRequest<TestCaseListType> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/test_cases" ],
  })
  schema = TestCaseListSchema
}
export const List = () => new ListRequest()


class GetRequest extends BaseRequest<TestCaseBoxType> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/test_cases/{test_case_id}" ],
  })
  schema = TestCaseBoxSchema
}
export const Get = () => new GetRequest()


class DestroyRequest extends BaseRequest<TestCaseBoxType> {
  scheme = Scheme.delete({
    endpoint: "/svc/v2/projects/{project_id}/test_cases/{id}",
    relatedKeys: [ "/test_cases" ]
  })
  schema = TestCaseBoxSchema
}
export const Destroy = () => new DestroyRequest()


class CreateRequest extends BaseRequest<TestCaseBoxType> {
  scheme = Scheme.post({
    endpoint: "/svc/v2/projects/{project_id}/test_cases",
    relatedKeys: [ "/test_cases" ]
  })
  schema = TestCaseBoxSchema
  bodySchema = TestCaseBodySchema
}
export const Create = () => new CreateRequest()


class HistoryRequest extends BaseRequest<TestCaseListType> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/test_cases/{id}", "/history" ],
  })
  schema = TestCaseListSchema
}
export const History = () => new HistoryRequest()
