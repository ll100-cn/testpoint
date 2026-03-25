import { type Ref } from "vue"
import { createProvideInject, createRelayPresenterConfig } from '../utils'

export interface ButtonPresenterConfig {
  variant?: 'primary' | 'secondary' | 'destructive' | 'muted' | 'tint' | 'silence'
  size?: 'default' | 'xs' | 'sm' | 'lg'
  shape?: 'rounded' | 'pill' | 'square-rounded' | 'circle'
}

export type ButtonPresenter = {
  root: (config: Partial<ButtonPresenterConfig>) => string
}

export interface ButtonPresenters {
  standard: ButtonPresenter
}

export const {
  relayInjectPresenterConfig: relayButtonPresenterConfig
} = createRelayPresenterConfig<ButtonPresenterConfig>('button-presenter-config', {
  variant: 'primary',
  size: 'default',
  shape: 'rounded',
})

export const {
  useInject: useButtonPresenter,
  useProvide: provideButtonPresenter
} = createProvideInject<Ref<ButtonPresenter>>('button-presenter')

export const {
  useInject: useButtonPresenters,
  useProvide: provideButtonPresenters
} = createProvideInject<ButtonPresenters>('button-presenters')
