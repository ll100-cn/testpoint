import { TestCase } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"


export class TestCaseDestroy extends BaseObjectRequest<TestCase> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/projects/{project_id}/test_cases/{id}"
    this.klass = TestCase
  }
}
