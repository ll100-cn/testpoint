import { TestCaseLabel, TestCaseLabelInfo } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const List = class extends BaseRequest<Array<TestCaseLabel>> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/test_case_labels"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToArray(TestCaseLabel, response)
  }
}

export const InfoList = class extends BaseRequest<Array<TestCaseLabelInfo>> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/test_case_label_infos"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToArray(TestCaseLabelInfo, response)
  }
}

export const InfoCreate = class extends BaseRequest<TestCaseLabelInfo> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/projects/{project_id}/test_case_label_infos"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCaseLabelInfo, response)
  }
}

export const InfoUpdate = class extends BaseRequest<TestCaseLabelInfo> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/test_case_label_infos/{test_case_label_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCaseLabelInfo, response)
  }
}

export const InfoDestroy = class extends BaseRequest<TestCaseLabelInfo> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/projects/{project_id}/test_case_label_infos/{test_case_label_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCaseLabelInfo, response)
  }
}

export const InfoGet = class extends BaseRequest<TestCaseLabelInfo> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/test_case_label_infos/{test_case_label_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCaseLabelInfo, response)
  }
}
