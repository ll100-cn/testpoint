import { Category, CategoryBox, CategoryPage } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class ListRequest extends BaseRequest<CategoryBox[]> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/categories" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CategoryPage<CategoryBox>, response).list
  }
}
export const List = () => new ListRequest()


class PageRequest extends BaseRequest<CategoryPage<CategoryBox>> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/categories" ]
  graph = "counts"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CategoryPage<CategoryBox>, response)
  }
}
export const Page = () => new PageRequest()


class CreateRequest extends BaseRequest<CategoryBox> {
  method = "POST"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/categories" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CategoryBox, response)
  }
}
export const Create = () => new CreateRequest()


class GetRequest extends BaseRequest<CategoryBox> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/categories", "/{category_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CategoryBox, response)
  }
}
export const Get = () => new GetRequest()


class UpdateRequest extends BaseRequest<CategoryBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/categories", "/{category_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CategoryBox, response)
  }
}
export const Update = () => new UpdateRequest()


class DestroyRequest extends BaseRequest<CategoryBox> {
  method = "DELETE"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/categories", "/{category_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CategoryBox, response)
  }
}
export const Destroy = () => new DestroyRequest()
