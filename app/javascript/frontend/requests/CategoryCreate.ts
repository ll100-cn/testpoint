import { Category } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class CategoryCreate extends BaseObjectRequest<Category> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/projects/{project_id}/categories"
    this.klass = Category
  }
}
