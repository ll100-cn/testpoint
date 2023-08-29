import { Category } from "@/models"
import BasePaginationRequest from "./BasePaginationRequest"

export class CategoryPaginationList extends BasePaginationRequest<Category> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/categories"
    this.klass = Category
  }
}
