import { TestCase } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"


export class TestCaseCreate extends BaseObjectRequest<TestCase> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/projects/{project_id}/test_cases"
    this.klass = TestCase
  }
}
