
import { type Ref } from "vue"
import { createProvideInject, createRelayPresenterConfig } from '../utils'

export interface BreadcrumbPresenterConfig {
  variant?: 'standard'
}

export type BreadcrumbPresenter = {
  root: (config: Partial<BreadcrumbPresenterConfig>) => string
  ellipsis: (config: Partial<BreadcrumbPresenterConfig>) => string
  item: (config: Partial<BreadcrumbPresenterConfig>) => string
  link: (config: Partial<BreadcrumbPresenterConfig>) => string
  list: (config: Partial<BreadcrumbPresenterConfig>) => string
  page: (config: Partial<BreadcrumbPresenterConfig>) => string
  separator: (config: Partial<BreadcrumbPresenterConfig>) => string
}

export interface BreadcrumbPresenters {
  standard: BreadcrumbPresenter
}

export const {
  relayInjectPresenterConfig: relayBreadcrumbPresenterConfig
} = createRelayPresenterConfig<BreadcrumbPresenterConfig>('breadcrumb-presenter-config', {
  variant: 'standard',
})

export const {
  useInject: useBreadcrumbPresenter,
  useProvide: provideBreadcrumbPresenter
} = createProvideInject<Ref<BreadcrumbPresenter>>('breadcrumb-presenter')

export const {
  useInject: useBreadcrumbPresenters,
  useProvide: provideBreadcrumbPresenters
} = createProvideInject<BreadcrumbPresenters>('breadcrumb-presenters')
