import { TestCase } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Update = class extends BaseRequest<TestCase> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/test_cases/{id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCase, response)
  }
}

export const List = class extends BaseRequest<Array<TestCase>> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/test_cases"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToArray(TestCase, response)
  }
}

export const Get = class extends BaseRequest<TestCase> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/test_cases/{test_case_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCase, response)
  }
}

export const Destroy = class extends BaseRequest<TestCase> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/projects/{project_id}/test_cases/{id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCase, response)
  }
}

export const Create = class extends BaseRequest<TestCase> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/projects/{project_id}/test_cases"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(TestCase, response)
  }
}

export const History = class extends BaseRequest<Array<TestCase>> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/test_cases/{id}/history"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToArray(TestCase, response)
  }
}
