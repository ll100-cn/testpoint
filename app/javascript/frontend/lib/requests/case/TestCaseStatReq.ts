import { TestCaseStat } from "@/models"
import BaseArrayRequest from "../BaseArrayRequest"

export default {
  List: class extends BaseArrayRequest<TestCaseStat> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/test_case_stats"
      this.klass = TestCaseStat
    }
  }
}
