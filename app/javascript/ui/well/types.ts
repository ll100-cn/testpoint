import { createProvideInject } from '../utils'

export interface WellPresenters {
}

export const {
  useInject: useWellPresenters,
  useProvide: provideWellPresenters
} = createProvideInject<WellPresenters>('Well-presenters')
