import { Category, CategoryInfo } from "@/models"
import BasePaginationRequest from "../BasePaginationRequest"
import BaseObjectRequest from "../BaseObjectRequest"

export default {
  Page: class extends BasePaginationRequest<CategoryInfo> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/category_infos"
      this.klass = CategoryInfo
    }
  },

  Create: class extends BaseObjectRequest<CategoryInfo> {
    constructor() {
      super()
      this.method = "POST"
      this.endpoint = "/api/projects/{project_id}/category_infos"
      this.klass = CategoryInfo
    }
  },

  Get: class extends BaseObjectRequest<CategoryInfo> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/category_infos/{category_id}"
      this.klass = CategoryInfo
    }
  },

  Update: class extends BaseObjectRequest<CategoryInfo> {
    constructor() {
      super()
      this.method = "PATCH"
      this.endpoint = "/api/projects/{project_id}/category_infos/{category_id}"
      this.klass = CategoryInfo
    }
  },

  Destroy: class extends BaseObjectRequest<CategoryInfo> {
    constructor() {
      super()
      this.method = "DELETE"
      this.endpoint = "/api/projects/{project_id}/category_infos/{category_id}"
      this.klass = CategoryInfo
    }
  },

}