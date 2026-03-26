import { BaseRequest, Scheme } from "../BaseRequest"
import {
  CategoryBodySchema,
  CategoryBoxSchema,
  CategoryListSchema,
  CategoryPageSchema,
  type CategoryBoxType,
  type CategoryListType,
  type CategoryPageType,
} from '@/schemas/category'

class ListRequest extends BaseRequest<CategoryListType> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/categories" ],
  })
  schema = CategoryListSchema
}
export const List = () => new ListRequest()


class PageRequest extends BaseRequest<CategoryPageType> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/categories" ],
  })
  graph = "counts"
  schema = CategoryPageSchema
}
export const Page = () => new PageRequest()


class CreateRequest extends BaseRequest<CategoryBoxType> {
  scheme = Scheme.post({
    endpoint: "/svc/v2/projects/{project_id}/categories",
    relatedKeys: [ [ "/categories" ] ]
  })
  schema = CategoryBoxSchema
  bodySchema = CategoryBodySchema
}
export const Create = () => new CreateRequest()


class GetRequest extends BaseRequest<CategoryBoxType> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/categories/{category_id}" ],
  })
  schema = CategoryBoxSchema
}
export const Get = () => new GetRequest()


class UpdateRequest extends BaseRequest<CategoryBoxType> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/categories/{category_id}",
    relatedKeys: [ [ "/categories", "/{category_id}" ] ]
  })
  schema = CategoryBoxSchema
  bodySchema = CategoryBodySchema
}
export const Update = () => new UpdateRequest()


class DestroyRequest extends BaseRequest<CategoryBoxType> {
  scheme = Scheme.delete({
    endpoint: "/svc/v2/projects/{project_id}/categories/{category_id}",
    relatedKeys: [ [ "/categories" ] ]
  })
  schema = CategoryBoxSchema
}
export const Destroy = () => new DestroyRequest()
