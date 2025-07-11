import _ from "lodash"
import { toValue } from "vue"
import { parseTemplate } from 'url-template'

/**
 * 检查 queryKey 中是否有任何一个与 invalidateKeys 中的通配符模式匹配
 * 支持通配符匹配，例如 "/channels/*" 可以匹配 "/channels/1"
 */
export function matchInvalidateKeys(queryKey: readonly unknown[], options: { invalidateKeys: Array<string[] | string>, interpolations?: Record<string, any> }): boolean {
  const keys = queryKey.filter(it => typeof it === "string").map(it => toValue(it)) as string[]
  const { invalidateKeys, interpolations } = options

  // 展开 invalidateKeys，支持数组格式
  const expandedKeys = expandInvalidateKeys(invalidateKeys)

  // 处理模板插值
  const patterns = expandedKeys.map((template) => {
    const values = _.mapValues(interpolations ?? {}, it => toValue(it))
    return parseTemplate(template).expand(values)
  })

  return keys.some(key => matchWildcardPatterns(key, patterns))
}

/**
 * 展开 invalidateKeys，将数组格式转换为字符串数组
 * @param invalidateKeys 可能包含字符串或字符串数组的数组
 * @returns 展开后的字符串数组
 *
 * 示例：
 * - ["/feeds", "/feeds/{id}"] => ["/feeds", "/feeds/{id}"]
 * - [["/feeds", "/{id}"]] => ["/feeds", "/feeds/{id}"]
 * - [["/feeds", "/{id}", "/perform"]] => ["/feeds", "/feeds/{id}", "/feeds/{id}/perform"]
 */
function expandInvalidateKeys(invalidateKeys: Array<string[] | string>): string[] {
  const result: string[] = []

  for (const key of invalidateKeys) {
    if (typeof key === 'string') {
      result.push(key)
    } else if (Array.isArray(key)) {
      // 数组格式：第一个元素是基础路径，后面的元素累积拼接
      const [basePath, ...suffixes] = key
      result.push(basePath)

      let currentPath = basePath
      for (const suffix of suffixes) {
        currentPath += suffix
        result.push(currentPath)
      }
    }
  }

  return result
}

/**
 * 检查一个字符串是否匹配通配符模式数组中的任何一个
 * @param target 目标字符串，例如 "/channels/1"
 * @param patterns 模式字符串数组，例如 ["/channels/*", "/users/*"]
 * @returns 是否匹配
 */
function matchWildcardPatterns(target: string, patterns: string[]): boolean {
  return patterns.some(pattern => {
    // 如果没有通配符，直接比较
    if (!pattern.includes('*')) {
      return target === pattern
    }

    // 将通配符模式转换为正则表达式
    // 转义特殊字符，然后将 * 替换为 [^/]*（不包含 "/" 的任意字符）
    const regexPattern = pattern
      .replace(/[.+?^${}()|[\]\\]/g, '\\$&') // 转义特殊字符
      .replace(/\*/g, '[^/]*') // 将 * 替换为 [^/]*（不包含 "/" 的任意字符）

    const regex = new RegExp(`^${regexPattern}$`)
    return regex.test(target)
  })
}




