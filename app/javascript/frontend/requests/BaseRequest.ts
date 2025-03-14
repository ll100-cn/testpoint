import { ErrorAccessDenied, ErrorUnauthorized } from "@/requests"
import { Pagination } from "@/models"
import { ErrorsObject } from "@/models/ErrorsObject"
import { UnprocessableEntityError } from "$ui/simple_form"
import { DisposableRequest } from "@/lib/DisposableRequest"
import { AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type Method } from "axios"
import { type ClassConstructor, plainToInstance } from "class-transformer"
import _ from "lodash"
import * as qs from "qs"
import URI from 'urijs'
import URITemplate from "urijs/src/URITemplate"

export interface RequestContext {
  $axios: AxiosInstance,
}

export abstract class BaseRequest<T> extends DisposableRequest<T> {
  endpoint!: string
  interpolations = {} as { [ x: string]: any }
  query = {} as { [ x: string]: any }
  data: any = {}
  method!: Method
  graph: string | null = null
  headers = {}
  config: AxiosRequestConfig = {}
  ctx: RequestContext = { $axios: null! }

  setup(ctx: { $axios: any }, callback?: (instance: this) => void | null): this {
    this.ctx = ctx

    if (callback) {
      callback(this)
    }

    return this
  }

  perform(data?: any) {
    this.data = data
    return this
  }

  async perform1(data?): Promise<T> {
    this.data = data
    return await this.request()
  }

  async request(): Promise<T> {
    try {
      const resp = await this.axiosRequest(this.data)
      const result = this.processResponse(resp)
      return result
    } catch (e) {
      return await this.processError(e)
    }
  }

  async processError(e: unknown): Promise<T> {
    if (e instanceof AxiosError && e.response?.status === 403) {
      throw new ErrorAccessDenied()
    } else if (e instanceof AxiosError && e.response?.status === 401) {
      throw new ErrorUnauthorized()
    } else if (e instanceof AxiosError && e.response?.status === 422) {
      const errors = plainToInstance(ErrorsObject, e.response.data)
      throw new UnprocessableEntityError(errors)
    } else {
      throw e
    }
  }

  abstract processResponse(response: AxiosResponse): T

  buildUrl() {
    const url = URITemplate(this.endpoint).expand(this.interpolations)
    const uri = new URI(url)
    const queryString = qs.stringify(this.query, { arrayFormat: "brackets" })
    return uri.query(queryString).toString()
  }

  async axiosRequest(data: any): Promise<AxiosResponse> {
    const { $axios } = this.ctx
    const config: AxiosRequestConfig = {
      signal: this.aborter.signal,
      url: this.buildUrl(),
      method: this.method,
      headers: this.headers,
      ...this.config,
    }

    if (this.graph) {
      config.headers!["X-Resource-Graph"] = this.graph
    }

    if (data) {
      const formData = data instanceof FormData ? data : this.buildFormData(data, config.headers!["Content-Type"])
      config.data = formData
    }

    const resp = await $axios.request(config)
    return resp
  }

  buildFormData(params, contentType: string) {
    if (contentType === "application/json") {
      return params
    }

    const formData = new FormData()
    for (const name in params) {
      const value = params[name]
      this.fillFormData(formData, name, value)
    }

    return formData
  }

  fillFormData(formData, name, value) {
    if (_.isArray(value)) {
      for (const [ key, val ] of value.entries()) {
        if (_.isPlainObject(val)) {
          this.fillFormData(formData, `${name}[${key}]`, val)
        } else {
          this.fillFormData(formData, `${name}[]`, val)
        }
      }
    } else if (_.isPlainObject(value)) {
      for (const attr in value) {
        const val = value[attr]
        this.fillFormData(formData, `${name}[${attr}]`, val)
      }
    } else {
      _.isNull(value) ? formData.append(name, "") : formData.append(name, value)
    }
  }

  responseToArray<K>(klass: ClassConstructor<K>, response: AxiosResponse): K[] {
    return plainToInstance<K, K>(klass, response.data)
  }

  responseToObject<K>(klass: ClassConstructor<K>, response: AxiosResponse): K {
    return plainToInstance(klass, response.data)
  }

  responseToPagination<K>(klass: ClassConstructor<K>, response: AxiosResponse): Pagination<K> {
    const pagination = new Pagination<K>()
    const result = this.responseToArray(klass, response)
    pagination.list = result
    pagination.build(response)
    return pagination
  }
}
