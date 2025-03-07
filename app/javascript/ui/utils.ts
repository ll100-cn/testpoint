import { cva } from 'class-variance-authority'
import { clsx, type ClassValue } from 'clsx'
import _ from 'lodash'
import { twMerge } from 'tailwind-merge'
import { computed, inject, provide, type InjectionKey, type Ref } from 'vue'

export type NoUndefined<T> = {
  [K in keyof T]-?: NonNullable<T[K]> | (undefined extends T[K] ? null : never) | (null extends T[K] ? null : never);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function pt<T extends Record<string, string | Function>>(source: T) {
  return _.mapValues(source, (value) => {
    if (value instanceof Function) {
      return value
    } else {
      return () => value
    }
  }) as Record<keyof T, (...args: any[]) => string>
}

export function compactObject(obj: Record<string, any> | null | undefined, excludeValues: any[] = [ null, undefined, "" ]) {
  return _.pickBy(obj, (val) => {
    return !excludeValues.includes(val)
  })
}

export function createRelayPreseterConfig<C>(name: string, defaults: NoUndefined<C>) {
  const key: InjectionKey<Ref<C>> = Symbol(name)

  const relayInjectPreseterConfig = (props?: Partial<C> | undefined) => {
    const injectConfig = inject(key, null)
    const keys = Object.keys(defaults) as (keyof C)[]

    const config = computed(() => {
      const result  = _.pick({
        ...defaults,
        ...injectConfig?.value,
        ...compactObject(props, [ null, undefined ]),
      }, keys) as C

      return result
    })

    provide(key, config)
    return config
  }

  return { key, relayInjectPreseterConfig }
}

export function createProvideInject<T>(name: string) {
  const key: InjectionKey<T> = Symbol(name)

  const useProvide = (value: T) => {
    provide(key, value)
    return value
  }
  const useInject = () => {
    return inject(key)!
  }
  return { key, useProvide, useInject }
}

export function bva<C extends Record<string, any>>(
  base: string,
  variants: Partial<Record<keyof C, Partial<Record<C[keyof C], string>>>>
) {
  return cva(base, {
    variants: variants as any
  }) as (config: Partial<C>) => string
}

