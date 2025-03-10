import { type Ref } from "vue"
import { createProvideInject, createRelayPreseterConfig } from '../utils'

export interface NavPresenterConfig {
  size?: 'xs' | 'sm' | 'default'
}

export type NavPresenter = {
  list: (config: Partial<NavPresenterConfig>) => string
  item: (config: Partial<NavPresenterConfig>) => string
}

export const {
  relayInjectPreseterConfig: relayNavPreseterConfig
} = createRelayPreseterConfig<NavPresenterConfig>('nav-presenter-config', {
  size: 'default',
})

export const {
  useInject: useNavPresenter,
  useProvide: provideNavPresenter
} = createProvideInject<Ref<NavPresenter>>('nav-presenter')

export interface NavPresenters {
}

export const {
  useInject: useNavPresenters,
  useProvide: provideNavPresenters
} = createProvideInject<NavPresenters>('Nav-presenters')
