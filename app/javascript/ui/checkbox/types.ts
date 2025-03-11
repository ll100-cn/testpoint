import { type Ref } from "vue"
import { createProvideInject, createRelayPresenterConfig } from '../utils'

export interface CheckboxPresenterConfig {
}

export type CheckboxPresenter = {
  root: (config: Partial<CheckboxPresenterConfig>) => string
  indicator: (config: Partial<CheckboxPresenterConfig>) => string
}

export const {
  relayInjectPresenterConfig: relayCheckboxPresenterConfig
} = createRelayPresenterConfig<CheckboxPresenterConfig>('checkbox-presenter-config', {
})

export const {
  useInject: useCheckboxPresenter,
  useProvide: provideCheckboxPresenter
} = createProvideInject<Ref<CheckboxPresenter>>('checkbox-presenter')

export interface CheckboxPresenters {
  standard: CheckboxPresenter
}

export const {
  useInject: useCheckboxPresenters,
  useProvide: provideCheckboxPresenters
} = createProvideInject<CheckboxPresenters>('Checkbox-presenters')
