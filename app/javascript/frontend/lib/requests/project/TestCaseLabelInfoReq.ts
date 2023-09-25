import { TestCaseLabel, TestCaseLabelInfo } from "@/models"
import BaseArrayRequest from "../BaseArrayRequest"
import BaseObjectRequest from "../BaseObjectRequest"

export default {
  List: class extends BaseArrayRequest<TestCaseLabelInfo> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/test_case_label_infos"
      this.klass = TestCaseLabelInfo
    }
  },

  Create: class extends BaseObjectRequest<TestCaseLabelInfo> {
    constructor() {
      super()
      this.method = "POST"
      this.endpoint = "/api/projects/{project_id}/test_case_labels"
      this.klass = TestCaseLabelInfo
    }
  },

  Update: class extends BaseObjectRequest<TestCaseLabelInfo> {
    constructor() {
      super()
      this.method = "PATCH"
      this.endpoint = "/api/projects/{project_id}/test_case_labels/{test_case_label_id}"
      this.klass = TestCaseLabelInfo
    }
  },

  Destroy: class extends BaseObjectRequest<TestCaseLabelInfo> {
    constructor() {
      super()
      this.method = "DELETE"
      this.endpoint = "/api/projects/{project_id}/test_case_labels/{test_case_label_id}"
      this.klass = TestCaseLabelInfo
    }
  },

  Get: class extends BaseObjectRequest<TestCaseLabelInfo> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/test_case_labels/{test_case_label_id}"
      this.klass = TestCaseLabelInfo
    }
  }
}