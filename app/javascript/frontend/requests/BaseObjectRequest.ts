import { type AxiosResponse } from "axios"
import { type ClassConstructor, plainToInstance } from "class-transformer"
import { BaseRequest } from "./BaseRequest"

export default abstract class BaseObjectRequest<T> extends BaseRequest<T> {
  klass!: ClassConstructor<T>

  processResponse(response: AxiosResponse): T {
    return plainToInstance(this.klass, response.data)
  }
}
