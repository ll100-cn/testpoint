import { TestCase } from "@/models"
import BaseArrayRequest from "../BaseArrayRequest"


export default class extends BaseArrayRequest<TestCase> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/test_cases/{id}/history"
    this.klass = TestCase
  }
}
