import { ErrorAccessDenied, ErrorUnauthorized } from "@/lib/requests"
import Keyv from "@keyvhq/core"
import { AxiosError, AxiosHeaders, type AxiosInstance, type AxiosProgressEvent, type AxiosRequestConfig, type AxiosResponse, type Method } from "axios"
import _ from "lodash"
import * as qs from "qs"
import * as rxjs from "rxjs"
import { Subscription } from "rxjs/internal/Subscription"
import URI from 'urijs'
import URITemplate from "urijs/src/URITemplate"
import { type ClassConstructor, plainToInstance } from "class-transformer"
import { ErrorsObject } from "@/models/ErrorsObject"
import { UnprocessableEntityError } from "$vendor/ui"

export interface PerformContext {
  $axios: AxiosInstance,
  $keyv: Keyv
}

export abstract class BaseRequest<T> {
  endpoint!: string
  interpolations = {} as { [ x: string]: any }
  query = {} as { [ x: string]: any }
  cancellation!: Subscription
  $axios!: AxiosInstance
  $keyv!: Keyv
  data: any = {}
  method!: Method
  graph: string | null = null
  headers = {}
  conifg: AxiosRequestConfig = {}
  ctx: PerformContext = { $axios: null!, $keyv: null! }
  subject!: rxjs.Subject<T>

  setup(ctx: { $axios: any, $keyv: any }, callback: (instance: this) => void | null = null): this {
    this.ctx = ctx

    if (callback) {
      callback(this)
    }

    return this
  }

  async perform(data?): Promise<T> {
    const subject = this.doPerformSubject(data)
    return await rxjs.lastValueFrom(subject)
  }

  doPerformSubject(data?) {
    if (this.subject) {
      return this.subject
    }

    this.subject = new rxjs.ReplaySubject()
    this.doPerform(data).then(it => {
      this.subject.next(it)
      this.subject.complete()
    }).catch(e => {
      this.subject.error(e)
    })

    return this.subject
  }

  async doPerform(data?): Promise<T> {
    this.data = data

    try {
      const resp = await this.axiosRequest(data)
      const result = this.processResponse(resp)
      return result
    } catch (e) {
      return await this.processError(e)
    }
  }

  async processError(e: Error): Promise<T> {
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
      headers: this.headers,
      ...this.conifg
    }

    if (this.graph) {
      config.headers!["X-Resource-Graph"] = this.graph
    }

    if (data) {
      const formData = data instanceof FormData ? data : this.buildFormData(data, config.headers!["Content-Type"])
      config.data = formData
    }

    if (config.method === "GET") {
      const key = `${config.url}+${this.graph}`
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
}
