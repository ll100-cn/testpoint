import { ErrorAccessDenied, ErrorUnauthorized } from "@/requests"
import Keyv from "@keyvhq/core"
import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from "axios"
import _ from "lodash"
import * as qs from "qs"
import * as rxjs from "rxjs"
import { Subscription } from "rxjs/internal/Subscription"
import URI from 'urijs'
import URITemplate from "urijs/src/URITemplate"

export interface PerformContext {
  $axios: AxiosInstance,
  $keyv: Keyv
}

export abstract class BaseRequest<T> {
  endpoint!: string
  interpolations = {} as { [ x: string]: any }
  query = {} as { [ x: string]: any }
  cancellation: Subscription | null
  $axios: AxiosInstance = null
  $keyv: Keyv = null
  data: any = {}
  method!: Method
  ctx: PerformContext = { $axios: null, $keyv: null }

  setup(ctx: { $axios: any, $keyv: any }, callback: (instance: this) => void | null = null): this {
    this.ctx = ctx

    if (callback) {
      callback(this)
    }

    return this
  }

  async perform(data?): Promise<T> {
    this.data = data

    try {
      const resp = await this.axiosRequest(data)
      const result = this.processResponse(resp)
      return result
    } catch (e) {
      await this.processError(e)
    }
  }

  async processError(e: Error) {
    if (e instanceof AxiosError && e.response.status === 403) {
      throw new ErrorAccessDenied()
    } else if (e instanceof AxiosError && e.response.status === 401) {
      throw new ErrorUnauthorized()
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

  cancellable(subscriptions: Subscription[]): this {
    this.cancellation = new rxjs.Subject().subscribe()
    subscriptions.push(this.cancellation)
    return this
  }

  axiosDefaultConfig(): AxiosRequestConfig {
    const controller = new AbortController()
    if (this.cancellation) {
      this.cancellation.add(() => {
        controller.abort()
      })
    }

    return {
      signal: controller.signal
    }
  }

  async axiosRequest(data: any): Promise<AxiosResponse> {
    const { $axios, $keyv } = this.ctx
    const config: AxiosRequestConfig = {
      url: this.buildUrl(),
      method: this.method,
      // headers: this.headers,
    }

    if (data) {
      const formData = data instanceof FormData ? data : this.buildFormData(data)
      config.data = formData
    }

    if (config.method === "GET") {
      const key = config.url
      const cached = await $keyv.get(key)

      if (cached) {
        return cached
      } else {
        const resp = await $axios.request(config)
        await $keyv.set(key, resp)
        return resp
      }
    } else {
      const resp = await $axios.request(config)
      await $keyv.clear()
      return resp
    }
  }

  buildFormData(params) {
    const formData = new FormData()
    for (const name in params) {
      const value = params[name]
      this.fillFormData(formData, name, value)
    }
    return formData
  }

  fillFormData(formData, name, value) {
    if (_.isArray(value)) {
      for (const val of value) {
        this.fillFormData(formData, `${name}[]`, val)
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
}
