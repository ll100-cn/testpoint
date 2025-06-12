import { TestCaseLabel, TestCaseLabelBox, TestCaseLabelInfo, TestCaseLablePage } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class ListRequest<Box extends TestCaseLabelBox> extends BaseRequest<Box[]> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/test_case_labels" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCaseLablePage<Box>, response).list
  }
}
export const List = () => new ListRequest()


class PageRequest extends BaseRequest<TestCaseLablePage<TestCaseLabelBox>> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/test_case_labels" ]
  graph = "counts"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCaseLablePage<TestCaseLabelBox>, response)
  }
}
export const Page = () => new PageRequest()


class CreateRequest extends BaseRequest<TestCaseLabelBox> {
  method = "POST"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/test_case_labels" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCaseLabelBox, response)
  }
}
export const Create = () => new CreateRequest()


class UpdateRequest extends BaseRequest<TestCaseLabelBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/test_case_labels", "/{test_case_label_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCaseLabelBox, response)
  }
}
export const Update = () => new UpdateRequest()


class DestroyRequest extends BaseRequest<TestCaseLabelBox> {
  method = "DELETE"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/test_case_labels", "/{test_case_label_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCaseLabelBox, response)
  }
}
export const Destroy = () => new DestroyRequest()


class GetRequest extends BaseRequest<TestCaseLabelBox> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/test_case_labels", "/{test_case_label_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCaseLabelBox, response)
  }
}
export const Get = () => new GetRequest()
