import { type Ref } from "vue"
import { createProvideInject, createRelayPresenterConfig } from '../utils'

export interface ButtonGroupPresenterConfig {
}

export type ButtonGroupPresenter = {
  root: (config: Partial<ButtonGroupPresenterConfig>) => string
}

export interface ButtonGroupPresenters {
  standard: ButtonGroupPresenter
}

export const {
  relayInjectPresenterConfig: relayButtonGroupPresenterConfig
} = createRelayPresenterConfig<ButtonGroupPresenterConfig>('button-group-presenter-config', {
})

export const {
  useInject: useButtonGroupPresenter,
  useProvide: provideButtonGroupPresenter
} = createProvideInject<Ref<ButtonGroupPresenter>>('button-group-presenter')

export const {
  useInject: useButtonGroupPresenters,
  useProvide: provideButtonGroupPresenters
} = createProvideInject<ButtonGroupPresenters>('button-group-presenters')
