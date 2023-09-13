import { TestCase } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"
import BaseArrayRequest from "./BaseArrayRequest"


export default {
  Update: class extends BaseObjectRequest<TestCase> {
    constructor() {
      super()
      this.method = "PATCH"
      this.endpoint = "/api/projects/{project_id}/test_cases/{id}"
      this.klass = TestCase
    }
  },

  List: class extends BaseArrayRequest<TestCase> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/test_cases"
      this.klass = TestCase
    }
  },

  Get: class extends BaseObjectRequest<TestCase> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/test_cases/{test_case_id}"
      this.klass = TestCase
    }
  },

  Destroy: class extends BaseObjectRequest<TestCase> {
    constructor() {
      super()
      this.method = "DELETE"
      this.endpoint = "/api/projects/{project_id}/test_cases/{id}"
      this.klass = TestCase
    }
  },

  Create: class extends BaseObjectRequest<TestCase> {
    constructor() {
      super()
      this.method = "POST"
      this.endpoint = "/api/projects/{project_id}/test_cases"
      this.klass = TestCase
    }
  }


}