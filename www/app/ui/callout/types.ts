import { type Ref } from 'vue'
import { createProvideInject, createRelayPresenterConfig } from '../utils'

export interface CalloutPresenterConfig {
  variant?: 'primary' | 'secondary' | 'muted' | 'silence' | 'destructive' | 'constructive' | 'tint'
}

export type CalloutPresenter = {
  root: (config: Partial<CalloutPresenterConfig>) => string
  title: (config: Partial<CalloutPresenterConfig>) => string
  description: (config: Partial<CalloutPresenterConfig>) => string
}

export const {
  relayInjectPresenterConfig: relayCalloutPresenterConfig
} = createRelayPresenterConfig<CalloutPresenterConfig>('callout-presenter-config', {
  variant: 'primary'
})

export const {
  useInject: useCalloutPresenter,
  useProvide: provideCalloutPresenter
} = createProvideInject<Ref<CalloutPresenter>>('callout-presenter')

export interface CalloutPresenters {
  standard: CalloutPresenter
}

export const {
  useInject: useCalloutPresenters,
  useProvide: provideCalloutPresenters
} = createProvideInject<CalloutPresenters>('callout-presenters')
