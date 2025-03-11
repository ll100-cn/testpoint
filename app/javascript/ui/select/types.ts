
import { type Ref } from "vue"
import { createProvideInject, createRelayPresenterConfig } from '../utils'

export interface SelectPresenterConfig {
}

export type SelectPresenter = {
  root: (config: Partial<SelectPresenterConfig>) => string
  content: (config: Partial<SelectPresenterConfig>) => string
  group: (config: Partial<SelectPresenterConfig>) => string
  item: (config: Partial<SelectPresenterConfig>) => string
  itemText: (config: Partial<SelectPresenterConfig>) => string
  label: (config: Partial<SelectPresenterConfig>) => string
  scrollDownButton: (config: Partial<SelectPresenterConfig>) => string
  scrollUpButton: (config: Partial<SelectPresenterConfig>) => string
  separator: (config: Partial<SelectPresenterConfig>) => string
  trigger: (config: Partial<SelectPresenterConfig>) => string
}

export interface SelectPresenters {
  standard: SelectPresenter
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
