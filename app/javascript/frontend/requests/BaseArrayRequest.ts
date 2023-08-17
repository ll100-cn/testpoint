import { type AxiosResponse } from "axios"
import { ClassConstructor, plainToInstance } from "class-transformer"
import { BaseRequest } from "./BaseRequest"

export default abstract class BaseArrayRequest<T> extends BaseRequest<T[]> {
  klass!: ClassConstructor<T>

  processResponse(response: AxiosResponse): T[] {
    return plainToInstance<T, T>(this.klass, response.data)
  }
}
