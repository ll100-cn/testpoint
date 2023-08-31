import { TestCaseLabel } from "@/models"
import BaseArrayRequest from "./BaseArrayRequest"

export class TestCaseLabelUpdate extends BaseArrayRequest<TestCaseLabel> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/test_case_labels/{test_case_label_id}"
    this.klass = TestCaseLabel
  }
}
