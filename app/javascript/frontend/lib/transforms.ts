import { Transform, Type } from "class-transformer"
import Big from 'big.js'

export function Klass<T>(klass: new () => T) {
  return Type(() => klass)
}

export const Boolean = Transform(({ value }) => {
  if (value == null || value == "") {
    return null
  }

  return [1, "1", "true", "TRUE", "True", true].includes(value)
})

export const Decimal = Transform(({ value }) => {
  if (value == null || value == "") {
    return null
  }

  return Big(value)
})

export const Number = Klass(globalThis.Number)
export const Date = Klass(globalThis.Date)
export const String = Klass(globalThis.String)