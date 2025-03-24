import { type Ref } from "vue"
import { createProvideInject, createRelayPresenterConfig } from '../utils'

export interface TooltipPresenterConfig {
}

export type TooltipPresenter = {
  content: (config: Partial<TooltipPresenterConfig>) => string
}

export interface TooltipPresenters {
  standard: TooltipPresenter
}

export const {
  relayInjectPresenterConfig: relayTooltipPresenterConfig
} = createRelayPresenterConfig<TooltipPresenterConfig>('tooltip-presenter-config', {
})

export const {
  useInject: useTooltipPresenter,
  useProvide: provideTooltipPresenter
} = createProvideInject<Ref<TooltipPresenter>>('tooltip-presenter')

export const {
  useInject: useTooltipPresenters,
  useProvide: provideTooltipPresenters
} = createProvideInject<TooltipPresenters>('tooltip-presenters')
