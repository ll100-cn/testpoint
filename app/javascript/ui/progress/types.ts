import { type Ref } from 'vue'
import { createProvideInject, createRelayPreseterConfig } from '../utils'

export interface ProgressPresenterConfig {
  variant?: 'primary'
}

export interface ProgressPresenter {
  root: (config: Partial<ProgressPresenterConfig>) => string
  indicator: (config: Partial<ProgressPresenterConfig>) => string
}

export const {
  relayInjectPreseterConfig: relayProgressPreseterConfig
} = createRelayPreseterConfig<ProgressPresenterConfig>('progress-presenter-config', {
  variant: 'primary'
})

export const {
  useInject: useProgressPresenter,
  useProvide: provideProgressPresenter
} = createProvideInject<Ref<ProgressPresenter>>('progress-presenter')

export interface ProgressPresenters {
}

export const {
  useInject: useProgressPresenters,
  useProvide: provideProgressPresenters
} = createProvideInject<ProgressPresenters>('Progress-presenters')
