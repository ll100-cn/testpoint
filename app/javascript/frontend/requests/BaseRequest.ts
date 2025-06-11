import { ErrorAccessDenied, ErrorUnauthorized } from "@/requests"
import { Pagination } from "@/models"
import { ErrorsObject } from "@/models/ErrorsObject"
import { UnprocessableEntityError } from "$ui/simple_form"
import { DisposableRequest } from "@/lib/DisposableRequest"
import { AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type Method } from "axios"
import { type ClassConstructor, plainToInstance } from "class-transformer"
import _ from "lodash"
import queryString from "query-string"
import URI from 'urijs'
import { parseTemplate } from 'url-template'
import type { MutationOptions, QueryClient, QueryFilters, UseQueryOptions } from "@tanstack/vue-query"
import { matchEndpoint } from "@/lib/EndpointMatch"
import { computed, toValue } from "vue"
import type { Ref } from "vue"

export type RequestOptions = {
  interpolations?: Record<string, number | string | Ref<number | string>>
  query?: Record<string, any>
  body?: Record<string, any>
}
export interface RequestContext {
  $axios: AxiosInstance,
}

export abstract class BaseRequest<T> {
  endpoint!: string[]
  interpolations: Required<RequestOptions>["interpolations"] = {}
  query = {} as { [ x: string]: any }
  data: any = {}
  method!: Method | string
  graph: string | null = null
  declare readonly _responseType: T
  headers = {}
  config: AxiosRequestConfig = {}
  ctx: RequestContext = { $axios: null! }
  abortSignal?: AbortSignal

  toQueryConfig() {
    const config = {
      interpolations: this.interpolations ?? {},
      query: this.query ?? {},
    } satisfies RequestOptions

    const queryKey: Array<string | Record<string, any>> = [ ...this.buildEndpointUrl(config) ]
    if (this.graph) {
      queryKey.push(`+${this.graph}`)
    }
    queryKey.push({ ...config.query })

    return {
      queryKey,
      queryFn: (context) => {
        return this.perform()
      },
      throwOnError: true,
    } satisfies UseQueryOptions<T>
  }

  toMutationConfig({ client }: { client: QueryClient }, { onSuccess, mutationFn }: Pick<MutationOptions<T, Error, RequestOptions>, "onSuccess" | "mutationFn"> = {}) {
    return {
      mutationFn: mutationFn ?? ((options: RequestOptions) => this.perform(options)),
      onSuccess: onSuccess ?? ((data, options) => {
        client.invalidateQueries(this.invalidatePredicate(options))
      }),
    } satisfies MutationOptions<T, Error, RequestOptions>
  }

  invalidatePredicate({ interpolations }: RequestOptions) {
    return {
      predicate: (query) => matchEndpoint(query.queryKey, { endpoint: this.endpoint, interpolations })
    } satisfies QueryFilters
  }

  async perform(overrides: RequestOptions = {}): Promise<T> {
    this.interpolations = overrides.interpolations ?? this.interpolations
    this.query = overrides.query ?? this.query

    const options = {
      interpolations: overrides.interpolations ?? this.interpolations,
      query: overrides.query ?? this.query,
      body: overrides.body,
    }
    const config = this.buildPerformConfig(options)
    try {
      const resp = await this.ctx.$axios.request(config)
      return this.processResponse(resp)
    } catch (e) {
      return this.processError(e)
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

  buildEndpointUrl(options: RequestOptions) {
    return this.endpoint.map(it => computed(() => {
      const interpolations = _.mapValues(options.interpolations ?? {}, it => toValue(it))
      return parseTemplate(it).expand(interpolations)
    }))
  }

  buildUrl(options: RequestOptions) {
    const url = this.buildEndpointUrl(options).map(it => it.value).join("")
    const uri = new URI(url)
    const query_string = queryString.stringify(options.query ?? {}, { arrayFormat: "bracket" })
    return uri.query(query_string).toString()
  }

  abstract processResponse(response: AxiosResponse): T

  buildPerformConfig(options: RequestOptions) {
    const config: AxiosRequestConfig = {
      signal: this.abortSignal,
      url: this.buildUrl(options),
      method: this.method,
      headers: this.headers,
      ...this.config,
    }

    if (this.graph) {
      config.headers!["X-Resource-Graph"] = this.graph
    }

    if (options.body) {
      const formData = options.body instanceof FormData ? options.body : this.buildFormData(options.body, config.headers!["Content-Type"])
      config.data = formData
    }

    if (config.method == "PATCH" || config.method == "POST" || config.method == "DELETE") {
      config.headers!["X-CSRF-Token"] = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content")
    }

    return config
  }

  buildFormData(params: Record<string, any>, contentType: string) {
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

  fillFormData(formData: FormData, name: string, value: any) {
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
      if (typeof value === "number") {
        formData.append(name, value.toString())
      } else if (_.isNull(value)) {
        formData.append(name, "")
      } else {
        formData.append(name, value)
      }
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
