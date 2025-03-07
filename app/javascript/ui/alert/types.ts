import { cva } from 'class-variance-authority'
import * as _ from 'radash'
import { type Ref } from 'vue'
import { createProvideInject, createRelayPreseterConfig } from '../utils'

export interface AlertPresenterConfig {
  variant?: 'primary' | 'secondary' | 'muted' | 'silence' | 'destructive' | 'successful' | 'tint'
}

export type AlertPresenter = {
  root: (config: Partial<AlertPresenterConfig>) => string
  title: (config: Partial<AlertPresenterConfig>) => string
  description: (config: Partial<AlertPresenterConfig>) => string
}

export const {
  relayInjectPreseterConfig: relayAlertPreseterConfig
} = createRelayPreseterConfig<AlertPresenterConfig>('Alert-presenter-config', {
  variant: 'primary'
})

export const {
  useInject: useAlertPresenter,
  useProvide: provideAlertPresenter
} = createProvideInject<Ref<AlertPresenter>>('Alert-presenter')

export interface AlertPresenters {
  standard: AlertPresenter
}

export const {
  useInject: useAlertPresenters,
  useProvide: provideAlertPresenters
} = createProvideInject<AlertPresenters>('Alert-presenters')
