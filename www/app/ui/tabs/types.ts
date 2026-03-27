import { type Ref } from "vue"
import { createProvideInject, createRelayPresenterConfig } from '../utils'

export interface TabsPresenterConfig {
}

export type TabsPresenter = {
  content: (config: Partial<TabsPresenterConfig>) => string
  list: (config: Partial<TabsPresenterConfig>) => string
  trigger: (config: Partial<TabsPresenterConfig>) => string
}

export interface TabsPresenters {
  standard: TabsPresenter
}

export const {
  relayInjectPresenterConfig: relayTabsPresenterConfig
} = createRelayPresenterConfig<TabsPresenterConfig>('tabs-presenter-config', {
})

export const {
  useInject: useTabsPresenter,
  useProvide: provideTabsPresenter
} = createProvideInject<Ref<TabsPresenter>>('tabs-presenter')

export const {
  useInject: useTabsPresenters,
  useProvide: provideTabsPresenters
} = createProvideInject<TabsPresenters>('tabs-presenters')
