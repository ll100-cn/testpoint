import { TestCaseLabel } from "@/models"
import BaseArrayRequest from "./BaseArrayRequest"

export class TestCaseLabelCreate extends BaseArrayRequest<TestCaseLabel> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/projects/{project_id}/test_case_labels"
    this.klass = TestCaseLabel
  }
}
