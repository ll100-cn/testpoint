import { TestCase } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"


export class TestCaseUpdate extends BaseObjectRequest<TestCase> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/test_cases/{id}"
    this.klass = TestCase
  }
}
