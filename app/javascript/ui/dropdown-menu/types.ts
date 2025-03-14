import { type Ref } from "vue"
import { createProvideInject, createRelayPresenterConfig } from '../utils'

export interface DropdownMenuPresenterConfig {
}

export type DropdownMenuPresenter = {
  root: (config: Partial<DropdownMenuPresenterConfig>) => string
  content: (config: Partial<DropdownMenuPresenterConfig>) => string
  item: (config: Partial<DropdownMenuPresenterConfig>) => string
  label: (config: Partial<DropdownMenuPresenterConfig>) => string
  separator: (config: Partial<DropdownMenuPresenterConfig>) => string
  sub: (config: Partial<DropdownMenuPresenterConfig>) => string
  subContent: (config: Partial<DropdownMenuPresenterConfig>) => string
  subTrigger: (config: Partial<DropdownMenuPresenterConfig>) => string
  trigger: (config: Partial<DropdownMenuPresenterConfig>) => string
}

export const {
  relayInjectPresenterConfig: relayDropdownMenuPresenterConfig
} = createRelayPresenterConfig<DropdownMenuPresenterConfig>('dropdown-menu-presenter-config', {
  variant: 'primary'
})

export const {
  useInject: useDropdownMenuPresenter,
  useProvide: provideDropdownMenuPresenter
} = createProvideInject<Ref<DropdownMenuPresenter>>('dropdown-menu-presenter')

export interface DropdownMenuPresenters {
  standard: DropdownMenuPresenter
}

export const {
  useInject: useDropdownMenuPresenters,
  useProvide: provideDropdownMenuPresenters
} = createProvideInject<DropdownMenuPresenters>('DropdownMenu-presenters')
