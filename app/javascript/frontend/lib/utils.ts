import md5 from 'js-md5'
import _ from 'lodash'
import { colord } from "colord"

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