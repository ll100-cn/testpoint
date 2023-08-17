import { type AxiosResponse } from "axios"
import { ClassConstructor, plainToInstance } from "class-transformer"
import { BaseRequest } from "./BaseRequest"
import { Pagination } from "@/models"

export default class BasePaginationRequest<T> extends BaseRequest<Pagination<T>> {
  klass: ClassConstructor<T>

  processResponse(response: AxiosResponse): Pagination<T> {
    const pagination = new Pagination<T>()
    const result = plainToInstance<T, T>(this.klass, response.data)
    pagination.list = result
    pagination.build(response)
    return pagination
  }
}
