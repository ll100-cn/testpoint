import { TestCase, TestCaseBox, TestCasePage } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Update = class extends BaseRequest<TestCaseBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/test_cases", "/{id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCaseBox, response)
  }
}

export const List = class extends BaseRequest<TestCasePage<TestCaseBox>> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/test_cases" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCasePage<TestCaseBox>, response)
  }
}

export const Get = class extends BaseRequest<TestCaseBox> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/test_cases", "/{test_case_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCaseBox, response)
  }
}

export const Destroy = class extends BaseRequest<TestCaseBox> {
  method = "DELETE"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/test_cases", "/{id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCaseBox, response)
  }
}

export const Create = class extends BaseRequest<TestCaseBox> {
  method = "POST"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/test_cases" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCaseBox, response)
  }
}

export const History = class extends BaseRequest<TestCasePage<TestCaseBox>> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/test_cases", "/{id}", "/history" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCasePage<TestCaseBox>, response)
  }
}
