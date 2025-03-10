import { type Ref } from "vue"
import { createProvideInject, createRelayPreseterConfig } from '../utils'

export interface CardPresenterConfig {
  // size?: 'xs' | 'sm' | 'default'
}

export type CardPresenter = {
  rounded: (config: Partial<CardPresenterConfig>) => string
  root: (config: Partial<CardPresenterConfig>) => string
  header: (config: Partial<CardPresenterConfig>) => string
  content: (config: Partial<CardPresenterConfig>) => string
  table: (config: Partial<CardPresenterConfig>) => string
  footer: (config: Partial<CardPresenterConfig>) => string
}

export const {
  relayInjectPreseterConfig: relayCardPreseterConfig
} = createRelayPreseterConfig<CardPresenterConfig>('card-presenter-config', {
  size: 'default',
})

export const {
  useInject: useCardPresenter,
  useProvide: provideCardPresenter
} = createProvideInject<Ref<CardPresenter>>('card-presenter')

export interface CardPresenters {
  standard: CardPresenter
}

export const {
  useInject: useCardPresenters,
  useProvide: provideCardPresenters
} = createProvideInject<CardPresenters>('Card-presenters')
