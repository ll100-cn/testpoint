import { TestCaseLabel } from "@/models"
import BaseArrayRequest from "./BaseArrayRequest"

export class TestCaseLabelList extends BaseArrayRequest<TestCaseLabel> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/test_case_labels"
    this.klass = TestCaseLabel
  }
}
