import { cva } from 'class-variance-authority'
import * as _ from 'radash'
import { type Ref } from 'vue'
import { createProvideInject, createRelayPreseterConfig } from '../utils'

export interface CalloutPresenterConfig {
  variant?: 'primary' | 'secondary' | 'muted' | 'silence' | 'destructive' | 'successful' | 'tint'
}

export type CalloutPresenter = {
  root: (config: Partial<CalloutPresenterConfig>) => string
  title: (config: Partial<CalloutPresenterConfig>) => string
  description: (config: Partial<CalloutPresenterConfig>) => string
}

export const {
  relayInjectPreseterConfig: relayCalloutPreseterConfig
} = createRelayPreseterConfig<CalloutPresenterConfig>('callout-presenter-config', {
  variant: 'primary'
})

export const {
  useInject: useCalloutPresenter,
  useProvide: provideCalloutPresenter
} = createProvideInject<Ref<CalloutPresenter>>('callout-presenter')
