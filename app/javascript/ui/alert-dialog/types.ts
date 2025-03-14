
import { type Ref } from "vue"
import { createProvideInject, createRelayPresenterConfig } from '../utils'

export interface AlertDialogPresenterConfig {
}

export type AlertDialogPresenter = {
  root: (config: Partial<AlertDialogPresenterConfig>) => string
  cancel: (config: Partial<AlertDialogPresenterConfig>) => string
  overlay: (config: Partial<AlertDialogPresenterConfig>) => string
  content: (config: Partial<AlertDialogPresenterConfig>) => string
  description: (config: Partial<AlertDialogPresenterConfig>) => string
  footer: (config: Partial<AlertDialogPresenterConfig>) => string
  header: (config: Partial<AlertDialogPresenterConfig>) => string
  title: (config: Partial<AlertDialogPresenterConfig>) => string
}

export interface AlertDialogPresenters {
  standard: AlertDialogPresenter
}

export const {
  relayInjectPresenterConfig: relayAlertDialogPresenterConfig
} = createRelayPresenterConfig<AlertDialogPresenterConfig>('alert-dialog-presenter-config', {
})

export const {
  useInject: useAlertDialogPresenter,
  useProvide: provideAlertDialogPresenter
} = createProvideInject<Ref<AlertDialogPresenter>>('alert-dialog-presenter')

export const {
  useInject: useAlertDialogPresenters,
  useProvide: provideAlertDialogPresenters
} = createProvideInject<AlertDialogPresenters>('alert-dialog-presenters')
