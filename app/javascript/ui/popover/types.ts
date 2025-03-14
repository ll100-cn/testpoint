
import { type Ref } from "vue"
import { createProvideInject, createRelayPresenterConfig } from '../utils'

export interface PopoverPresenterConfig {
}

export type PopoverPresenter = {
  root: (config: Partial<PopoverPresenterConfig>) => string
  content: (config: Partial<PopoverPresenterConfig>) => string
}

export interface PopoverPresenters {
  standard: PopoverPresenter
}

export const {
  relayInjectPresenterConfig: relayPopoverPresenterConfig
} = createRelayPresenterConfig<PopoverPresenterConfig>('popover-presenter-config', {
  size: 'default',
})

export const {
  useInject: usePopoverPresenter,
  useProvide: providePopoverPresenter
} = createProvideInject<Ref<PopoverPresenter>>('popover-presenter')

export const {
  useInject: usePopoverPresenters,
  useProvide: providePopoverPresenters
} = createProvideInject<PopoverPresenters>('popover-presenters')
