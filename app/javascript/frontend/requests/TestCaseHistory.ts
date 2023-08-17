import { TestCase } from "@/models"
import BaseArrayRequest from "./BaseArrayRequest"


export class TestCaseHistory extends BaseArrayRequest<TestCase> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/test_cases/{id}/history"
    this.klass = TestCase
  }
}
