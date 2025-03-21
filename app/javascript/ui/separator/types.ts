import { type Ref } from "vue"
import { createProvideInject, createRelayPresenterConfig } from '../utils'

export interface SeparatorPresenterConfig {
  orientation?: 'horizontal' | 'vertical'
}

export type SeparatorPresenter = {
  root: (config: Partial<SeparatorPresenterConfig>) => string
  label: (config: Partial<SeparatorPresenterConfig>) => string
}

export interface SeparatorPresenters {
  standard: SeparatorPresenter
}

export const {
  relayInjectPresenterConfig: relaySeparatorPresenterConfig
} = createRelayPresenterConfig<SeparatorPresenterConfig>('Separator-presenter-config', {
  orientation: 'horizontal',
})

export const {
  useInject: useSeparatorPresenter,
  useProvide: provideSeparatorPresenter
} = createProvideInject<Ref<SeparatorPresenter>>('Separator-presenter')

export const {
  useInject: useSeparatorPresenters,
  useProvide: provideSeparatorPresenters
} = createProvideInject<SeparatorPresenters>('Separator-presenters')
