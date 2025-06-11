// SNIP: 172183d46c2c08a2f2e3700f2f6adb93

import { useMutation, useQuery, useQueryClient, type QueryFunctionContext } from "@tanstack/vue-query"
import type { Ref } from "vue"
import type { BaseRequest } from "../requests"

class ReqWrapper<Req extends BaseRequest<any>> {
  request!: Req
  line!: QueryLine

  useQuery<
    TQueryFnData = unknown,
    TError = Error,
    TData = TQueryFnData,
    TQueryKey extends readonly unknown[] = readonly unknown[]
  >(options: Parameters<typeof useQuery<TQueryFnData, TError, TData, TQueryKey>>[0]) {
    const hackOptions = options as any
    const originQueryFn = hackOptions.queryFn
    hackOptions.queryFn = (context: QueryFunctionContext<TQueryKey, any>) => {
      this.request.ctx = { $axios: context.meta!.axios }
      this.request.abortSignal = context.signal
      return originQueryFn(context)
    }

    return this.line.useQuery<TQueryFnData, TError, TData, TQueryKey>(hackOptions)
  }

  useMutation<
    TData = unknown,
    TError = Error,
    TVariables = void,
    TContext = unknown
  >(options: Parameters<typeof useMutation<TData, TError, TVariables, TContext>>[0]) {
    const hackOptions = options as any
    const originMutationFn = hackOptions.mutationFn
    hackOptions.mutationFn = (variables: TVariables) => {
      const axios = this.line.client.getDefaultOptions().mutations?.meta?.axios
      this.request.ctx = { $axios: axios! }
      return originMutationFn(variables)
    }

    return this.line.useMutation<TData, TError, TVariables, TContext>(hackOptions)
  }

  get client() {
    return this.line.client
  }
}

export class QueryLine {
  suspenses: (() => Promise<any>)[] = []
  client!: ReturnType<typeof useQueryClient>

  useQuery<
    TQueryFnData = unknown,
    TError = Error,
    TData = TQueryFnData,
    TQueryKey extends readonly unknown[] = readonly unknown[]
  >(options: Parameters<typeof useQuery<TQueryFnData, TError, TData, TQueryKey>>[0]) {
    const { suspense, data, ...rest } = useQuery<TQueryFnData, TError, TData, TQueryKey>(options, this.client)
    this.suspenses.push(suspense)
    return { data: data as Ref<TData>, suspense, ...rest }
  }

  useMutation<
    TData = unknown,
    TError = Error,
    TVariables = void,
    TContext = unknown
  >(options: Parameters<typeof useMutation<TData, TError, TVariables, TContext>>[0]) {
    return useMutation<TData, TError, TVariables, TContext>(options, this.client)
  }

  async wait() {
    await Promise.all(this.suspenses.map(it => it()))
  }

  request<Req extends BaseRequest<any>, Ret>(RequestClass: new (...args: any[]) => Req, callback: (request: Req, it: ReqWrapper<Req>) => Ret): Ret {
    const request = new RequestClass() as Req
    const wrapper = new ReqWrapper<Req>()
    wrapper.line = this
    wrapper.request = request
    return callback(request, wrapper)
  }
}

export function useQueryLine() {
  const line = new QueryLine()
  line.client = useQueryClient()
  return line
}


type OmitFunctions<T> = {
  [K in keyof T as T[K] extends (...args: any) => any ? never : K]: T[K];
};
type NonStringOrNull<T> = T extends string | null | undefined ? never : T;
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
type MergeArrayTypes<T extends unknown[]> = OmitFunctions<UnionToIntersection<NonStringOrNull<T[number]>>>;

export function paramsQueryKey<T extends unknown[]>(
  queryKey: T
): MergeArrayTypes<T> {
  const [, ...objects] = queryKey;
  const result: Record<string, unknown> = {};

  for (const obj of objects) {
    if (obj != null && typeof obj !== 'string') {
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value !== 'function') {
          result[key] = value;
        }
      }
    }
  }

  return result as MergeArrayTypes<T>
}

