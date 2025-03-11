import { type Ref } from "vue"
import { createProvideInject, createRelayPresenterConfig } from '../utils'

export interface PaginationPresenterConfig {
}

export type PaginationPresenter = {
  ellipsis: (config: Partial<PaginationPresenterConfig>) => string
}

export interface PaginationPresenters {
  standard: PaginationPresenter
}

export const {
  relayInjectPresenterConfig: relayPaginationPresenterConfig
} = createRelayPresenterConfig<PaginationPresenterConfig>('pagination-presenter-config', {
  size: 'default',
})

export const {
  useInject: usePaginationPresenter,
  useProvide: providePaginationPresenter
} = createProvideInject<Ref<PaginationPresenter>>('pagination-presenter')

export const {
  useInject: usePaginationPresenters,
  useProvide: providePaginationPresenters
} = createProvideInject<PaginationPresenters>('pagination-presenters')
