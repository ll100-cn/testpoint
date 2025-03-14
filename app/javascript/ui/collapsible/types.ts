import { type Ref } from "vue"
import { createProvideInject, createRelayPresenterConfig } from '../utils'

export interface CollapsiblePresenterConfig {
}

export type CollapsiblePresenter = {
  root: (config: Partial<CollapsiblePresenterConfig>) => string
  content: (config: Partial<CollapsiblePresenterConfig>) => string
}

export interface CollapsiblePresenters {
  standard: CollapsiblePresenter
}

export const {
  relayInjectPresenterConfig: relayCollapsiblePresenterConfig
} = createRelayPresenterConfig<CollapsiblePresenterConfig>('collapsible-presenter-config', {
})

export const {
  useInject: useCollapsiblePresenter,
  useProvide: provideCollapsiblePresenter
} = createProvideInject<Ref<CollapsiblePresenter>>('collapsible-presenter')

export const {
  useInject: useCollapsiblePresenters,
  useProvide: provideCollapsiblePresenters
} = createProvideInject<CollapsiblePresenters>('collapsible-presenters')
