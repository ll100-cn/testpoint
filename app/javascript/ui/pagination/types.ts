import { createProvideInject } from '../utils'

export interface PaginationPresenters {
}

export const {
  useInject: usePaginationPresenters,
  useProvide: providePaginationPresenters
} = createProvideInject<PaginationPresenters>('Pagination-presenters')
