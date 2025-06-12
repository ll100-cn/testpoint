import { Category, CategoryBox, CategoryPage } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const List = class extends BaseRequest<CategoryBox[]> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/categories" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CategoryPage<CategoryBox>, response).list
  }
}

export const Page = class extends BaseRequest<CategoryPage<CategoryBox>> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/categories" ]
  graph = "counts"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CategoryPage<CategoryBox>, response)
  }
}

export const Create = class extends BaseRequest<CategoryBox> {
  method = "POST"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/categories" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CategoryBox, response)
  }
}

export const Get = class extends BaseRequest<CategoryBox> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/categories", "/{category_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CategoryBox, response)
  }
}

export const Update = class extends BaseRequest<CategoryBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/categories", "/{category_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CategoryBox, response)
  }
}

export const Destroy = class extends BaseRequest<CategoryBox> {
  method = "DELETE"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/categories", "/{category_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CategoryBox, response)
  }
}
