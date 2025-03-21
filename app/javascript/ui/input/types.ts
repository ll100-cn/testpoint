// SNIP: ca0f84dbd46db17b68bb6558d749a0c7
import { type Ref } from "vue"
import { createProvideInject, createRelayPresenterConfig } from '../utils'

export interface InputPresenterConfig {
  size?: 'xs' | 'sm' | 'default' | 'lg'
}

export type InputPresenter = {
  checkbox: (config: Partial<InputPresenterConfig>) => string
  radio: (config: Partial<InputPresenterConfig>) => string
  input: (config: Partial<InputPresenterConfig>) => string
  select: (config: Partial<InputPresenterConfig>) => string
}

export interface InputPresenters {
  standard: InputPresenter
}

export const {
  relayInjectPresenterConfig: relayInputPresenterConfig
} = createRelayPresenterConfig<InputPresenterConfig>('input-presenter-config', {
  size: 'default',
})

export const {
  useInject: useInputPresenter,
  useProvide: provideInputPresenter
} = createProvideInject<Ref<InputPresenter>>('input-presenter')

export const {
  useInject: useInputPresenters,
  useProvide: provideInputPresenters
} = createProvideInject<InputPresenters>('input-presenters')

export type OptionItem = {
  label: string
  value: string | number | boolean | null
}
