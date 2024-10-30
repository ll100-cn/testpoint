import { type Ref } from "vue"
import { createProvideInject, createRelayPreseterConfig } from '../utils'

export interface SeparatorPresenterConfig {
  // size?: 'xs' | 'sm' | 'default'
}

export type SeparatorPresenter = {
  root: (config: Partial<SeparatorPresenterConfig>) => string
  label: (config: Partial<SeparatorPresenterConfig>) => string
}

export const {
  relayInjectPreseterConfig: relaySeparatorPreseterConfig
} = createRelayPreseterConfig<SeparatorPresenterConfig>('Separator-presenter-config', {
  size: 'default',
})

export const {
  useInject: useSeparatorPresenter,
  useProvide: provideSeparatorPresenter
} = createProvideInject<Ref<SeparatorPresenter>>('Separator-presenter')

