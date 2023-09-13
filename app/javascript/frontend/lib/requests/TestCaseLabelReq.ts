import { TestCaseLabel } from "@/models"
import BaseArrayRequest from "./BaseArrayRequest"
import BaseObjectRequest from "./BaseObjectRequest"

export default {
  Update: class extends BaseObjectRequest<TestCaseLabel> {
    constructor() {
      super()
      this.method = "PATCH"
      this.endpoint = "/api/projects/{project_id}/test_case_labels/{test_case_label_id}"
      this.klass = TestCaseLabel
    }
  },

  List: class extends BaseArrayRequest<TestCaseLabel> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/test_case_labels"
      this.klass = TestCaseLabel
    }
  },

  Create: class extends BaseObjectRequest<TestCaseLabel> {
    constructor() {
      super()
      this.method = "POST"
      this.endpoint = "/api/projects/{project_id}/test_case_labels"
      this.klass = TestCaseLabel
    }
  },

  Destroy: class extends BaseObjectRequest<TestCaseLabel> {
    constructor() {
      super()
      this.method = "DELETE"
      this.endpoint = "/api/projects/{project_id}/test_case_labels/{test_case_label_id}"
      this.klass = TestCaseLabel
    }
  },

  Get: class extends BaseObjectRequest<TestCaseLabel> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/test_case_labels/{test_case_label_id}"
      this.klass = TestCaseLabel
    }
  }


}
