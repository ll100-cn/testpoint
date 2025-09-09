import { TestCase, type TestCaseBox, TestCaseBoxImpl, TestCasePage } from "@/models"
import { BaseRequest, Scheme } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class UpdateRequest extends BaseRequest<TestCaseBox> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/test_cases/{id}",
    relatedKeys: [ [ "/test_cases", "/{id}" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCaseBoxImpl, response)
  }
}
export const Update = () => new UpdateRequest()


class ListRequest extends BaseRequest<TestCasePage<TestCaseBox>> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/test_cases" ],
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCasePage<TestCaseBox>, response)
  }
}
export const List = () => new ListRequest()


class GetRequest extends BaseRequest<TestCaseBox> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/test_cases/{test_case_id}" ],
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCaseBoxImpl, response)
  }
}
export const Get = () => new GetRequest()


class DestroyRequest extends BaseRequest<TestCaseBox> {
  scheme = Scheme.delete({
    endpoint: "/svc/v2/projects/{project_id}/test_cases/{id}",
    relatedKeys: [ [ "/test_cases" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCaseBoxImpl, response)
  }
}
export const Destroy = () => new DestroyRequest()


class CreateRequest extends BaseRequest<TestCaseBox> {
  scheme = Scheme.post({
    endpoint: "/svc/v2/projects/{project_id}/test_cases",
    relatedKeys: [ [ "/test_cases" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCaseBoxImpl, response)
  }
}
export const Create = () => new CreateRequest()


class HistoryRequest extends BaseRequest<TestCasePage<TestCaseBox>> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/test_cases/{id}", "/history" ],
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCasePage<TestCaseBox>, response)
  }
}
export const History = () => new HistoryRequest()
