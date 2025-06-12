import { TestCaseLabel, TestCaseLabelBox, TestCaseLabelInfo, TestCaseLablePage } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class ListRequest extends BaseRequest<TestCaseLablePage<TestCaseLabelBox>> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/test_case_labels" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCaseLablePage<TestCaseLabelBox>, response)
  }
}
export const List = () => new ListRequest()


class InfoListRequest extends BaseRequest<TestCaseLablePage<TestCaseLabelBox>> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/test_case_labels" ]
  graph = "info"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCaseLablePage<TestCaseLabelBox>, response)
  }
}
export const InfoList = () => new InfoListRequest()


class InfoCreateRequest extends BaseRequest<TestCaseLabelBox> {
  method = "POST"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/test_case_labels" ]
  graph = "info"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCaseLabelBox, response)
  }
}
export const InfoCreate = () => new InfoCreateRequest()


class InfoUpdateRequest extends BaseRequest<TestCaseLabelBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/test_case_labels", "/{test_case_label_id}" ]
  graph = "info"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCaseLabelBox, response)
  }
}
export const InfoUpdate = () => new InfoUpdateRequest()


class InfoDestroyRequest extends BaseRequest<TestCaseLabelBox> {
  method = "DELETE"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/test_case_labels", "/{test_case_label_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCaseLabelBox, response)
  }
}
export const InfoDestroy = () => new InfoDestroyRequest()


class InfoGetRequest extends BaseRequest<TestCaseLabelBox> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/test_case_labels", "/{test_case_label_id}" ]
  graph = "info"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCaseLabelBox, response)
  }
}
export const InfoGet = () => new InfoGetRequest()
