import { Category } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class CategoryUpdate extends BaseObjectRequest<Category> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/categories/{category_id}"
    this.klass = Category
  }
}
