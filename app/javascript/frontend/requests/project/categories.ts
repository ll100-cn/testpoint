import { Category, type CategoryBox, CategoryBoxImpl, CategoryPage } from "@/models"
import { BaseRequest, Scheme } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class ListRequest extends BaseRequest<CategoryBox[]> {
  scheme = Scheme.get({
    endpoint: [ "/api/v2", "/projects/{project_id}", "/categories" ],
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CategoryPage<CategoryBox>, response).list
  }
}
export const List = () => new ListRequest()


class PageRequest extends BaseRequest<CategoryPage<CategoryBox>> {
  scheme = Scheme.get({
    endpoint: [ "/api/v2", "/projects/{project_id}", "/categories" ],
  })
  graph = "counts"

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CategoryPage<CategoryBox>, response)
  }
}
export const Page = () => new PageRequest()


class CreateRequest extends BaseRequest<CategoryBox> {
  scheme = Scheme.post({
    endpoint: "/api/v2/projects/{project_id}/categories",
    relatedKeys: [ [ "/categories" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CategoryBoxImpl, response)
  }
}
export const Create = () => new CreateRequest()


class GetRequest extends BaseRequest<CategoryBox> {
  scheme = Scheme.get({
    endpoint: [ "/api/v2", "/projects/{project_id}", "/categories/{category_id}" ],
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CategoryBoxImpl, response)
  }
}
export const Get = () => new GetRequest()


class UpdateRequest extends BaseRequest<CategoryBox> {
  scheme = Scheme.patch({
    endpoint: "/api/v2/projects/{project_id}/categories/{category_id}",
    relatedKeys: [ [ "/categories", "/{category_id}" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CategoryBoxImpl, response)
  }
}
export const Update = () => new UpdateRequest()


class DestroyRequest extends BaseRequest<CategoryBox> {
  scheme = Scheme.delete({
    endpoint: "/api/v2/projects/{project_id}/categories/{category_id}",
    relatedKeys: [ [ "/categories" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CategoryBoxImpl, response)
  }
}
export const Destroy = () => new DestroyRequest()
