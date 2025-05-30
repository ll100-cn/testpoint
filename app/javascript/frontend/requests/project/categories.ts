import { Category, CategoryBox, CategoryInfo, CategoryPage } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const List = class extends BaseRequest<CategoryPage<CategoryBox>> {
  constructor(project_id: number) {
    super()
    this.method = "GET"
    this.endpoint = "/api/v2/projects/{project_id}/categories"
    this.interpolations.project_id = project_id
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CategoryPage<CategoryBox>, response)
  }
}

export const InfoList = class extends BaseRequest<CategoryPage<CategoryBox>> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/v2/projects/{project_id}/categories"
    this.graph = "info"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CategoryPage<CategoryBox>, response)
  }
}

export const InfoCreate = class extends BaseRequest<CategoryInfo> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/projects/{project_id}/category_infos"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CategoryInfo, response)
  }
}

export const InfoGet = class extends BaseRequest<CategoryInfo> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/category_infos/{category_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CategoryInfo, response)
  }
}

export const InfoUpdate = class extends BaseRequest<CategoryInfo> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/category_infos/{category_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CategoryInfo, response)
  }
}

export const InfoDestroy = class extends BaseRequest<CategoryInfo> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/projects/{project_id}/category_infos/{category_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CategoryInfo, response)
  }
}
