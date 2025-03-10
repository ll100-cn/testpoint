import { type Ref } from 'vue'
import { createProvideInject, createRelayPreseterConfig } from '../utils'

export interface DialogPresenterConfig {
  variant?: 'primary'
}

export type DialogPresenter = {
  root: (config: Partial<DialogPresenterConfig>) => string
  content: (config: Partial<DialogPresenterConfig>) => string
  description: (config: Partial<DialogPresenterConfig>) => string
  footer: (config: Partial<DialogPresenterConfig>) => string
  header: (config: Partial<DialogPresenterConfig>) => string
  scrollContent: (config: Partial<DialogPresenterConfig>) => string
  title: (config: Partial<DialogPresenterConfig>) => string
}

export const {
  relayInjectPreseterConfig: relayDialogPreseterConfig
} = createRelayPreseterConfig<DialogPresenterConfig>('dialog-presenter-config', {
  variant: 'primary'
})

export const {
  useInject: useDialogPresenter,
  useProvide: provideDialogPresenter
} = createProvideInject<Ref<DialogPresenter>>('dialog-presenter')

export interface DialogPresenters {
  standard: DialogPresenter
}

export const {
  useInject: useDialogPresenters,
  useProvide: provideDialogPresenters
} = createProvideInject<DialogPresenters>('Dialog-presenters')
