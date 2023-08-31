import { Category } from "@/models"
import BaseArrayRequest from "./BaseArrayRequest"

export class CategoryList extends BaseArrayRequest<Category> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/categories"
    this.klass = Category
  }
}
