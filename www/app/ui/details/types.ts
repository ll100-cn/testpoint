
import { type Ref } from "vue"
import { createProvideInject, createRelayPresenterConfig } from '../utils'

export interface DetailsPresenterConfig {
  variant?: 'standard' | 'table'
}

export type DetailsPresenter = {
  root: (config: Partial<DetailsPresenterConfig>) => string
  content: (config: Partial<DetailsPresenterConfig>) => string
  item: (config: Partial<DetailsPresenterConfig>) => string
  label: (config: Partial<DetailsPresenterConfig>) => string
}

export interface DetailsPresenters {
  standard: DetailsPresenter
}

export const {
  relayInjectPresenterConfig: relayDetailsPresenterConfig
} = createRelayPresenterConfig<DetailsPresenterConfig>('details-presenter-config', {
  variant: 'standard',
})

export const {
  useInject: useDetailsPresenter,
  useProvide: provideDetailsPresenter
} = createProvideInject<Ref<DetailsPresenter>>('details-presenter')

export const {
  useInject: useDetailsPresenters,
  useProvide: provideDetailsPresenters
} = createProvideInject<DetailsPresenters>('details-presenters')
