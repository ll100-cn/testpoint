import { provide, inject, type InjectionKey } from 'vue'
import { type Ref } from "vue"
import { createProvideInject, createRelayPresenterConfig } from '../utils'

export interface DialogPresenterConfig {
  scroll?: 'content' | 'body'
}

export type DialogPresenter = {
  root: (config: Partial<DialogPresenterConfig>) => string
  content: (config: Partial<DialogPresenterConfig>) => string
  description: (config: Partial<DialogPresenterConfig>) => string
  footer: (config: Partial<DialogPresenterConfig>) => string
  header: (config: Partial<DialogPresenterConfig>) => string
  title: (config: Partial<DialogPresenterConfig>) => string
  overlay: (config: Partial<DialogPresenterConfig>) => string
  closeIcon: (config: Partial<DialogPresenterConfig>) => string
}

export const {
  relayInjectPresenterConfig: relayDialogPresenterConfig
} = createRelayPresenterConfig<DialogPresenterConfig>('dialog-presenter-config', {
  scroll: 'content'
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
