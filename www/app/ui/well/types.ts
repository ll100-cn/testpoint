import type { Ref } from 'vue'
import { createProvideInject, createRelayPresenterConfig } from '../utils'

export interface WellPresenterConfig {
  variant?: 'muted' | 'primary' | 'destructive'
}

export type WellPresenter = {
  root: (config: Partial<WellPresenterConfig>) => string
}

export const {
  relayInjectPresenterConfig: relayWellPresenterConfig
} = createRelayPresenterConfig<WellPresenterConfig>('well-presenter-config', {
  variant: 'muted',
})

export const {
  useInject: useWellPresenter,
  useProvide: provideWellPresenter
} = createProvideInject<Ref<WellPresenter>>('well-presenter')

export interface WellPresenters {
  standard: WellPresenter
}

export const {
  useInject: useWellPresenters,
  useProvide: provideWellPresenters
} = createProvideInject<WellPresenters>('well-presenters')
