import { TestCaseLabel, type TestCaseLabelBox, TestCaseLabelBoxImpl, TestCaseLablePage } from "@/models"
import { BaseRequest, Scheme } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class ListRequest<Box extends TestCaseLabelBox> extends BaseRequest<Box[]> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/test_case_labels" ],
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCaseLablePage<Box>, response).list
  }
}
export const List = () => new ListRequest()


class PageRequest extends BaseRequest<TestCaseLablePage<TestCaseLabelBox>> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/test_case_labels" ],
  })
  graph = "counts"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCaseLablePage<TestCaseLabelBox>, response)
  }
}
export const Page = () => new PageRequest()


class CreateRequest extends BaseRequest<TestCaseLabelBox> {
  scheme = Scheme.post({
    endpoint: "/svc/v2/projects/{project_id}/test_case_labels",
    relatedKeys: [ [ "/test_case_labels" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCaseLabelBoxImpl, response)
  }
}
export const Create = () => new CreateRequest()


class UpdateRequest extends BaseRequest<TestCaseLabelBox> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/test_case_labels/{test_case_label_id}",
    relatedKeys: [ [ "/test_case_labels", "/{test_case_label_id}" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCaseLabelBoxImpl, response)
  }
}
export const Update = () => new UpdateRequest()


class DestroyRequest extends BaseRequest<TestCaseLabelBox> {
  scheme = Scheme.delete({
    endpoint: "/svc/v2/projects/{project_id}/test_case_labels/{test_case_label_id}",
    relatedKeys: [ [ "/test_case_labels" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCaseLabelBoxImpl, response)
  }
}
export const Destroy = () => new DestroyRequest()


class GetRequest extends BaseRequest<TestCaseLabelBox> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/test_case_labels/{test_case_label_id}" ],
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCaseLabelBoxImpl, response)
  }
}
export const Get = () => new GetRequest()
