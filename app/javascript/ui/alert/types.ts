import { type Ref } from "vue"
import { createProvideInject, createRelayPresenterConfig } from '../utils'

export interface AlertPresenterConfig {
  variant?: 'primary' | 'secondary' | 'destructive' | 'constructive' | 'muted' | 'silence' | 'tint'
}

export type AlertPresenter = {
  root: (config: Partial<AlertPresenterConfig>) => string
  title: (config: Partial<AlertPresenterConfig>) => string
  description: (config: Partial<AlertPresenterConfig>) => string
}

export interface AlertPresenters {
  standard: AlertPresenter
}

export const {
  relayInjectPresenterConfig: relayAlertPresenterConfig
} = createRelayPresenterConfig<AlertPresenterConfig>('alert-presenter-config', {
  variant: 'primary',
})

export const {
  useInject: useAlertPresenter,
  useProvide: provideAlertPresenter
} = createProvideInject<Ref<AlertPresenter>>('alert-presenter')

export const {
  useInject: useAlertPresenters,
  useProvide: provideAlertPresenters
} = createProvideInject<AlertPresenters>('alert-presenters')
