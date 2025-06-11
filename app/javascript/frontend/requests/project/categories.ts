import { Category, CategoryBox, CategoryInfo, CategoryPage } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const List = class extends BaseRequest<CategoryPage<CategoryBox>> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/categories" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CategoryPage<CategoryBox>, response)
  }
}

export const InfoList = class extends BaseRequest<CategoryPage<CategoryBox>> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/categories" ]
  graph = "info"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CategoryPage<CategoryBox>, response)
  }
}

export const InfoCreate = class extends BaseRequest<CategoryInfo> {
  method = "POST"
  endpoint = [ "/api/projects", "/{project_id}", "/category_infos" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CategoryInfo, response)
  }
}

export const InfoGet = class extends BaseRequest<CategoryInfo> {
  method = "GET"
  endpoint = [ "/api/projects", "/{project_id}", "/category_infos", "/{category_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CategoryInfo, response)
  }
}

export const InfoUpdate = class extends BaseRequest<CategoryInfo> {
  method = "PATCH"
  endpoint = [ "/api/projects", "/{project_id}", "/category_infos", "/{category_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CategoryInfo, response)
  }
}

export const InfoDestroy = class extends BaseRequest<CategoryInfo> {
  method = "DELETE"
  endpoint = [ "/api/projects", "/{project_id}", "/category_infos", "/{category_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CategoryInfo, response)
  }
}
