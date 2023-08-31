import { TestCaseLabelInfo } from "@/models"
import BaseArrayRequest from "./BaseArrayRequest"

export class TestCaseLabelInfoList extends BaseArrayRequest<TestCaseLabelInfo> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/test_case_label_infos"
    this.klass = TestCaseLabelInfo
  }
}
