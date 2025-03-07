import { type Ref } from 'vue'
import { createProvideInject, createRelayPreseterConfig } from '../utils'

export interface TooltipPresenterConfig {
  variant?: 'primary'
}

export type TooltipPresenter = {
  root: (config: Partial<TooltipPresenterConfig>) => string
  content: (config: Partial<TooltipPresenterConfig>) => string
}

export const {
  relayInjectPreseterConfig: relayTooltipPreseterConfig
} = createRelayPreseterConfig<TooltipPresenterConfig>('tooltip-presenter-config', {
  variant: 'primary'
})

export const {
  useInject: useTooltipPresenter,
  useProvide: provideTooltipPresenter
} = createProvideInject<Ref<TooltipPresenter>>('tooltip-presenter')
