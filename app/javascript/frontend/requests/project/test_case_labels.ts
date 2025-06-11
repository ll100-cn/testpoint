import { TestCaseLabel, TestCaseLabelBox, TestCaseLabelInfo, TestCaseLablePage } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const List = class extends BaseRequest<TestCaseLablePage<TestCaseLabelBox>> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/test_case_labels" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCaseLablePage<TestCaseLabelBox>, response)
  }
}

export const InfoList = class extends BaseRequest<TestCaseLablePage<TestCaseLabelBox>> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/test_case_labels" ]
  graph = "info"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCaseLablePage<TestCaseLabelBox>, response)
  }
}

export const InfoCreate = class extends BaseRequest<TestCaseLabelBox> {
  method = "POST"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/test_case_labels" ]
  graph = "info"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCaseLabelBox, response)
  }
}

export const InfoUpdate = class extends BaseRequest<TestCaseLabelBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/test_case_labels", "/{test_case_label_id}" ]
  graph = "info"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCaseLabelBox, response)
  }
}

export const InfoDestroy = class extends BaseRequest<TestCaseLabelBox> {
  method = "DELETE"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/test_case_labels", "/{test_case_label_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCaseLabelBox, response)
  }
}

export const InfoGet = class extends BaseRequest<TestCaseLabelBox> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/test_case_labels", "/{test_case_label_id}" ]
  graph = "info"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCaseLabelBox, response)
  }
}
