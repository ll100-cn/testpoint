import { TestCaseLabel } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class TestCaseLabelShow extends BaseObjectRequest<TestCaseLabel> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/test_case_labels/{test_case_label_id}"
    this.klass = TestCaseLabel
  }
}
