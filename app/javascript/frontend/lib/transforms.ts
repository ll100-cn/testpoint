import { Transform, Type } from "class-transformer"
import Big from 'big.js'
import _ from "lodash"

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

export const Date = Klass(globalThis.Date)
export const String = Klass(globalThis.String)