import { TestCase } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class TestCaseGet extends BaseObjectRequest<TestCase> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/test_cases/{test_case_id}"
    this.klass = TestCase
  }
}
