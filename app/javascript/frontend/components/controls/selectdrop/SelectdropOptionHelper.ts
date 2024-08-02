import type { SelectdropOption } from "./types"
import _ from 'lodash'

export default class SelectdropOptionHelper {
  parents: Map<string | null, string[]>
  mapping: Map<string, SelectdropOption>

  constructor(mapping: Map<string, SelectdropOption>, parents: Map<string | null, string[]>) {
    this.mapping = mapping
    this.parents = parents
  }

  valueWithChildren(option: SelectdropOption) {
    const result = new Set<string | number>()
    result.add(option.value ?? option.id)

    const childIds = this.parents.get(option.id) ?? []
    for (const id of childIds) {
      const child = this.mapping.get(id)
      if (child) {
        const values = this.valueWithChildren(child)
        for (const value of values) {
          result.add(value)
        }
      }
    }

    return result
  }

  children(id: string) {
    const childIds = this.parents.get(id) ?? []
    return _(childIds).map(id => this.mapping.get(id)).compact().value()
  }

  ancestorIds(option: SelectdropOption | null) {
    if (!option || option.parent_id == null) {
      return []
    }

    const parent = this.mapping.get(option.parent_id)
    if (!parent) {
      return []
    }

    return [parent.id, ...this.ancestorIds(parent)]
  }

  descendantIds(id: string) {
    const children = this.children(id)
    const result = [] as string[]

    for (const child of children) {
      result.push(child.id)
      result.push(...this.descendantIds(child.id))
    }

    return result
  }
}
