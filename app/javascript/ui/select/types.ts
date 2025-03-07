import { type Ref } from 'vue'
import { createProvideInject, createRelayPreseterConfig } from '../utils'

export interface SelectPresenterConfig {
  variant?: 'primary'
}

export type SelectPresenter = {
  root: (config: Partial<SelectPresenterConfig>) => string
  content: (config: Partial<SelectPresenterConfig>) => string
  group: (config: Partial<SelectPresenterConfig>) => string
  item: (config: Partial<SelectPresenterConfig>) => string
  label: (config: Partial<SelectPresenterConfig>) => string
  scrollUpButton: (config: Partial<SelectPresenterConfig>) => string
  scrollDownButton: (config: Partial<SelectPresenterConfig>) => string
  separator: (config: Partial<SelectPresenterConfig>) => string
  trigger: (config: Partial<SelectPresenterConfig>) => string
}

export const {
  relayInjectPreseterConfig: relaySelectPreseterConfig
} = createRelayPreseterConfig<SelectPresenterConfig>('select-presenter-config', {
  variant: 'primary'
})

export const {
  useInject: useSelectPresenter,
  useProvide: provideSelectPresenter
} = createProvideInject<Ref<SelectPresenter>>('select-presenter')
