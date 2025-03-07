import type { Ref } from 'vue'
import { createProvideInject, createRelayPreseterConfig } from '../utils'

export interface ButtonPresenterConfig {
  size?: 'xs' | 'sm' | 'default' | 'lg'
  variant?: 'primary' | 'secondary' | 'muted' | 'silence' | 'destructive' | 'tint'
}

export type ButtonPresenter = {
  root: (config: Partial<ButtonPresenterConfig>) => string
}

export const {
  relayInjectPreseterConfig: relayButtonPreseterConfig
} = createRelayPreseterConfig<ButtonPresenterConfig>('button-presenter-config', {
  size: 'default',
  variant: 'primary'
})

export const {
  useInject: useButtonPresenter,
  useProvide: provideButtonPresenter
} = createProvideInject<Ref<ButtonPresenter>>('button-presenter')

export interface ButtonPresenters {
  standard: ButtonPresenter
}

export const {
  useInject: useButtonPresenters,
  useProvide: provideButtonPresenters
} = createProvideInject<ButtonPresenters>('Button-presenters')
