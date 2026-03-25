import { Transform, Type, plainToInstance, type TransformFnParams } from "class-transformer"
import Big from 'big.js'
import _ from "lodash"
import * as changeCase from 'change-case'

export function Klass<T>(klass: new () => T) {
  return Type(() => klass)
}

export const Boolean = Transform(({ value }) => {
  if (value === null || value === undefined || value === "") {
    return null
  }

  return [1, "1", "true", "TRUE", "True", true].includes(value)
})

export const Number = Transform(({ value }) => {
  if (value === null || value === undefined || value === "") {
    return null
  }

  return _.toNumber(value)
})

export const Decimal = Transform(({ value }) => {
  if (value === null || value === undefined || value === "") {
    return null
  }

  return Big(value)
})

export function Enum<T>(e: T) {
  return Transform(({ value }) => {
    if (value === null || value === undefined || value === "") {
      return null
    }

    return e[value as keyof T]
  })
}

export const Raw = Transform(({ obj, valueKey }: TransformFnParams) => {
  return obj[valueKey]
})

export const Date = Klass(globalThis.Date)
export const String = Klass(globalThis.String)

export function plainToObject<T>(klass: new (...args: any[]) => T, plain: any) {
  return plainToInstance<T, any>(klass, plain, {
    propertyFormat: (key: string) => {
      return changeCase.camelCase(key)
    }
  })
}

export function plainToArray<T>(klass: new (...args: any[]) => T, plain: any[]): Array<T> {
  return plainToInstance<T, any>(klass, plain, {
    propertyFormat: (key: string) => {
      return changeCase.camelCase(key)
    }
  })
}