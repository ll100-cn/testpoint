import { type Ref } from 'vue'
import { createProvideInject, createRelayPreseterConfig } from '../utils'

export interface TabsPresenterConfig {
  variant?: 'primary'
}

export type TabsPresenter = {
  root: (config: Partial<TabsPresenterConfig>) => string
  content: (config: Partial<TabsPresenterConfig>) => string
  list: (config: Partial<TabsPresenterConfig>) => string
  trigger: (config: Partial<TabsPresenterConfig>) => string
}

export const {
  relayInjectPreseterConfig: relayTabsPreseterConfig
} = createRelayPreseterConfig<TabsPresenterConfig>('tabs-presenter-config', {
  variant: 'primary'
})

export const {
  useInject: useTabsPresenter,
  useProvide: provideTabsPresenter
} = createProvideInject<Ref<TabsPresenter>>('tabs-presenter')

export interface TabsPresenters {
  standard: TabsPresenter
}

export const {
  useInject: useTabsPresenters,
  useProvide: provideTabsPresenters
} = createProvideInject<TabsPresenters>('Tabs-presenters')
