import type { InjectionKey, Ref, VNode } from "vue"

export interface SelectdropOption {
  id: string
  value: string | number | null | undefined
  content?: VNode[]
  parent_id?: string
}

export interface SelectdropMenuOption {
  value: string
  disabled?: boolean
  children?: SelectdropMenuOption[]
  content?: VNode[]
}

export interface SelectdropContext {
  multiple: boolean
  menuValues: Set<string>
  menuToggle(value: string, checked: boolean, source: 'checkbox' | 'entry'): void

  register(item: SelectdropOption): void
  unregister(id: SelectdropOption['id']): void
}

export const selectdropContextKey: InjectionKey<SelectdropContext> = Symbol("SelectdropContext")
