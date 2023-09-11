import md5 from 'js-md5'
import _ from 'lodash'
import { colord } from "colord"
import dayjs from '@/lib/dayjs'
import qs from "qs"
import { plainToClassFromExist } from 'class-transformer'

const color_cache = new Map<string, string>()

export function calcColorHex(text: string) {
  if (!color_cache.has(text)) {
    const hex = md5.array(text).slice(0, 3)
    const color = colord({ r: hex[0], g: hex[1], b: hex[2] })
    const hsl = color.toHsl()
    const new_color = colord({ h: hsl.h, s: hsl.s, l: 10 + 0.4 * hsl.l })
    color_cache.set(text, new_color.toHex())
  }

  return color_cache.get(text)
}

export function humanize(time: Date | null, pattern: string) {
  if (time == null) {
    return ""
  }

  return dayjs(time).format(pattern)
}

export function redirect(path: string) {
  const origin = location.origin
  location.href = origin + (import.meta.env.VITE_RUBY_BASE ?? '/') + _.trimStart(path, "/")
}

export function compactObject(obj) {
  return _.pickBy(obj, (it) => it != null)
}

export function queryToPlain(query) {
  const querystring = qs.stringify(query)
  return qs.parse(querystring, { ignoreQueryPrefix: true })
}

export function plainToQuery(plain): any {
  const querystring = qs.stringify(plain)
  return qs.parse(querystring, { depth: 0, ignoreQueryPrefix: true })
}

export function extractKeys(...args: any[]) {
  const result = []
  for (const arg of args) {
    if (arg instanceof Array) {
      result.push(...extractKeys(...arg))
    } else if (typeof arg === "string") {
      result.push(arg)
    } else {
      result.push(..._.keys(arg))
    }
  }

  return result
}

export function instance<T>(klass: { new(): T }, raw_data: any, options: { excludes?: any[] } = {}): T {
  const exclude_names = extractKeys(...options.excludes ?? [])
  const instance = new klass()
  const names = _(instance).keys().difference(exclude_names).value()
  const data = _.pick(raw_data, names)
  plainToClassFromExist(instance, data)
  return instance
}
