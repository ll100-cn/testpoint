import { Category } from "@/models"
import BaseArrayRequest from "../BaseArrayRequest"

export default {
  List: class extends BaseArrayRequest<Category> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/categories"
      this.klass = Category
    }
  }
}
