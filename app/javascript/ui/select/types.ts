import { createProvideInject, createRelayPresenterConfig } from "$ui/utils"
import type { AcceptableValue, injectSelectRootContext } from "reka-ui"
import type { Ref, VNode } from "vue"

export type SelectItemAttrs = {
  group: string | null,
  value: AcceptableValue
  vnodes: VNode[]
}

export interface SelectContext {
  unregisterItem(id: string, value: AcceptableValue): void
  registerItem(id: string, attrs: SelectItemAttrs): void

  findItemId(value: AcceptableValue): string | null
  findItem(id: string | null | undefined): SelectItemAttrs | null
  findChildren(parentId: string | null | undefined): SelectItemAttrs[]
  total: Ref<number>
}

export const {
  useInject: useSelectContext,
  useProvide: provideSelectContext
} = createProvideInject<SelectContext>('select-context')

export function modelValueToArray(rootContext: NonNullable<ReturnType<typeof injectSelectRootContext>>): AcceptableValue[] {
  if (!rootContext.modelValue.value) {
    return []
  } else if (rootContext.multiple.value && Array.isArray(rootContext.modelValue.value)) {
    return rootContext.modelValue.value
  } else {
    return [ rootContext.modelValue.value ]
  }
}

export interface SelectPresenterConfig {
  size?: 'xs' | 'sm' | 'default' | 'lg'
}

export interface SelectPresenter {
  trigger: (config: SelectPresenterConfig) => string
  content: (config: SelectPresenterConfig) => string
  item: (config: SelectPresenterConfig) => string
  group: (config: SelectPresenterConfig) => string
  label: (config: SelectPresenterConfig) => string
  separator: (config: SelectPresenterConfig) => string
}

export interface SelectPresenters {
  standard: SelectPresenter
}

export interface ItemsAware {
}

export const {
  relayInjectPresenterConfig: relaySelectPresenterConfig
} = createRelayPresenterConfig<SelectPresenterConfig>('select-presenter-config', {
  size: 'default',
})

export const {
  useInject: useSelectPresenter,
  useProvide: provideSelectPresenter
} = createProvideInject<Ref<SelectPresenter>>('select-presenter')

export const {
  useInject: useSelectPresenters,
  useProvide: provideSelectPresenters
} = createProvideInject<SelectPresenters>('select-presenters')
