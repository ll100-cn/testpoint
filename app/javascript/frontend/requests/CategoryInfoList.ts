import { CategoryInfo } from "@/models"
import BasePaginationRequest from "./BasePaginationRequest"

export class CategoryInfoList extends BasePaginationRequest<CategoryInfo> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/category_infos"
    this.klass = CategoryInfo
  }
}
