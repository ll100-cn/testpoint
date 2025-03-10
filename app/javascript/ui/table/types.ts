import { type Ref } from "vue"
import { createProvideInject, createRelayPreseterConfig } from '../utils'

export interface TablePresenterConfig {
  size?: 'xs' | 'sm' | 'default'
}

export type TablePresenter = {
  root: (config: Partial<TablePresenterConfig>) => string
  header: (config: Partial<TablePresenterConfig>) => string
  body: (config: Partial<TablePresenterConfig>) => string
  row: (config: Partial<TablePresenterConfig>) => string
  head: (config: Partial<TablePresenterConfig>) => string
  cell: (config: Partial<TablePresenterConfig>) => string
}

export const {
  relayInjectPreseterConfig: relayTablePreseterConfig
} = createRelayPreseterConfig<TablePresenterConfig>('table-presenter-config', {
  size: 'default',
})

export const {
  useInject: useTablePresenter,
  useProvide: provideTablePresenter
} = createProvideInject<Ref<TablePresenter>>('table-presenter')

export interface TablePresenters {
  standard: TablePresenter
}

export const {
  useInject: useTablePresenters,
  useProvide: provideTablePresenters
} = createProvideInject<TablePresenters>('Table-presenters')
