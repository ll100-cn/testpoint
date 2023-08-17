import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import { Subscription } from "rxjs/internal/Subscription"
import URITemplate from "urijs/src/URITemplate"
import * as rxjs from "rxjs"
import * as qs from "qs"
import URI from 'urijs'
import Keyv from "@keyvhq/core"
import { Validation } from "@/models"

export interface PerformContext {
  $axios: AxiosInstance,
  $keyv: Keyv
}

export class ErrorUnprocessableEntity {
  names: { [x in string]: string } = {}
  validations: Validation[] = []
}

export class BaseRequest {
  endpoint: string
  interpolations = {} as { [ x: string]: any }
  query = {} as { [ x: string]: any }
  cancellation: Subscription | null

  constructor() {
    this.initialize()
  }

  initialize(): void { }

  setup(callback: ((_: this) => void)): this {
    callback(this)
    return this
  }

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

  async axiosRequest(ctx: PerformContext, config: AxiosRequestConfig): Promise<AxiosResponse> {
    const $axios = ctx.$axios
    const $keyv = ctx.$keyv

    // for await (const [ key, raw ] of { [Symbol.asyncIterator]: () => $keyv.iterator() }) {
    //   console.log(key)
    // }

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

  handleUnprocessableEntity(err: any) {
    if (!(err instanceof AxiosError) || err.response.status != 422) {
      return
    }

    const resp = err.response
    const errors = resp.data.errors
    const error = new ErrorUnprocessableEntity()
    error.names = resp.data.names

    for (const code in errors || {}) {
      const messages = errors[code]
      const validation = new Validation()
      validation.code = code
      validation.state = "invalid"
      validation.messages = messages

      error.validations.push(validation)
    }

    throw error
  }
}
