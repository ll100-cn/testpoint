import { type Ref } from 'vue'
import { createProvideInject, createRelayPreseterConfig } from '../utils'

export interface AlertDialogPresenterConfig {
  variant?: 'primary'
}

export type AlertDialogPresenter = {
  root: (config: Partial<AlertDialogPresenterConfig>) => string
  content: (config: Partial<AlertDialogPresenterConfig>) => string
  description: (config: Partial<AlertDialogPresenterConfig>) => string
  footer: (config: Partial<AlertDialogPresenterConfig>) => string
  header: (config: Partial<AlertDialogPresenterConfig>) => string
  title: (config: Partial<AlertDialogPresenterConfig>) => string
}

export const {
  relayInjectPreseterConfig: relayAlertDialogPreseterConfig
} = createRelayPreseterConfig<AlertDialogPresenterConfig>('alert-dialog-presenter-config', {
  variant: 'primary'
})

export const {
  useInject: useAlertDialogPresenter,
  useProvide: provideAlertDialogPresenter
} = createProvideInject<Ref<AlertDialogPresenter>>('alert-dialog-presenter')

export interface AlertDialogPresenters {
  standard: AlertDialogPresenter
}

export const {
  useInject: useAlertDialogPresenters,
  useProvide: provideAlertDialogPresenters
} = createProvideInject<AlertDialogPresenters>('alert-dialog-presenters')
