import { TestCase } from "@/models"
import BaseArrayRequest from "./BaseArrayRequest"


export class TestCaseList extends BaseArrayRequest<TestCase> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/test_cases"
    this.klass = TestCase
  }
}
