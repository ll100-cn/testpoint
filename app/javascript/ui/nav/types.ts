import { type Ref } from "vue"
import { createProvideInject, createRelayPresenterConfig } from '../utils'

export interface NavPresenterConfig {
  size?: 'xs' | 'sm' | 'default'
}

export type NavPresenter = {
  list: (config: Partial<NavPresenterConfig>) => string
  item: (config: Partial<NavPresenterConfig>) => string
}

export interface NavPresenters {
}

export const {
  relayInjectPresenterConfig: relayNavPresenterConfig
} = createRelayPresenterConfig<NavPresenterConfig>('nav-presenter-config', {
  size: 'default',
})

export const {
  useInject: useNavPresenter,
  useProvide: provideNavPresenter
} = createProvideInject<Ref<NavPresenter>>('nav-presenter')

export const {
  useInject: useNavPresenters,
  useProvide: provideNavPresenters
} = createProvideInject<NavPresenters>('nav-presenters')
