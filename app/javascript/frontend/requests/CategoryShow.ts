import { Category } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class CategoryShow extends BaseObjectRequest<Category> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/categories/{category_id}"
    this.klass = Category
  }
}
