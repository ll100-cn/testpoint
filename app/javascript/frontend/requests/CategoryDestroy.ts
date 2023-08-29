import { Category } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class CategoryDestroy extends BaseObjectRequest<Category> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/projects/{project_id}/categories/{category_id}"
    this.klass = Category
  }
}
