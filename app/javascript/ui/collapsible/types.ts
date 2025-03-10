import { type Ref } from 'vue'
import { createProvideInject, createRelayPreseterConfig } from '../utils'

export interface CollapsiblePresenterConfig {
  variant?: 'primary'
}

export type CollapsiblePresenter = {
  root: (config: Partial<CollapsiblePresenterConfig>) => string
  content: (config: Partial<CollapsiblePresenterConfig>) => string
}

export const {
  relayInjectPreseterConfig: relayCollapsiblePreseterConfig
} = createRelayPreseterConfig<CollapsiblePresenterConfig>('collapsible-presenter-config', {
  variant: 'primary'
})

export const {
  useInject: useCollapsiblePresenter,
  useProvide: provideCollapsiblePresenter
} = createProvideInject<Ref<CollapsiblePresenter>>('collapsible-presenter')

export interface CollapsiblePresenters {
  standard: CollapsiblePresenter
}

export const {
  useInject: useCollapsiblePresenters,
  useProvide: provideCollapsiblePresenters
} = createProvideInject<CollapsiblePresenters>('Collapsible-presenters')
